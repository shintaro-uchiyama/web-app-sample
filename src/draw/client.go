package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
	tenantUUID     = "00000000-0000-0000-0000-000000000001"
	targetUUID     = "00000000-0000-0000-0000-000000000002"
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// FIXME: allow access from web
		return true
	},
}

type (
	Client struct {
		hub      *Hub
		conn     *websocket.Conn
		dynamoDB *dynamodb.Client
		send     chan []byte
		userUUID uuid.UUID
		hexColor string
	}
	CanvasCoordinate struct {
		X int `json:"x"`
		Y int `json:"y"`
	}
	PaintedCanvasCoordinate struct {
		OriginalCanvasCordinate CanvasCoordinate `json:"originalCanvasCordinate"`
		NewCanvasCordinate      CanvasCoordinate `json:"newCanvasCordinate"`
	}
	PaintedCanvasCoordinates struct {
		TenantUUID string
		SortKey    string
		PaintedCanvasCoordinate
		UserUUID string
		HexColor string `json:"hexColor"`
	}
	CanvasResponse struct {
		Type                     string
		PaintedCanvasCoordinates []PaintedCanvasCoordinates
		PaintedCanvasCoordinate  PaintedCanvasCoordinates
	}
	DynamoDBScanAPI interface {
		Scan(ctx context.Context,
			params *dynamodb.ScanInput,
			optFns ...func(*dynamodb.Options)) (*dynamodb.ScanOutput, error)
	}
)

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		var paintedCanvasCoordinate PaintedCanvasCoordinate
		json.Unmarshal(message, &paintedCanvasCoordinate)

		// TODO: get target uuid from client request
		tableName := "tenant1"
		item := PaintedCanvasCoordinates{
			TenantUUID:              tenantUUID,
			SortKey:                 fmt.Sprintf("draw#%s#%s", targetUUID, time.Now().Format(time.RFC3339Nano)),
			PaintedCanvasCoordinate: paintedCanvasCoordinate,
			UserUUID:                c.userUUID.String(),
			HexColor:                c.hexColor,
		}

		av, err := attributevalue.MarshalMap(item)
		if err != nil {
			log.Fatalf("Got error marshalling new movie item: %s", err)
		}
		if _, err := c.dynamoDB.PutItem(context.Background(), &dynamodb.PutItemInput{
			TableName: aws.String(tableName),
			Item:      av,
		}); err != nil {
			log.Fatalf("failed to put item, %v", err)
		}

		byteMessage, err := json.Marshal(CanvasResponse{
			Type:                    "Realtime",
			PaintedCanvasCoordinate: item,
		})
		if err != nil {
			log.Fatalf("json mershal error: %s", err)
		}

		c.hub.broadcast <- byteMessage
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func GetItems(c context.Context, api DynamoDBScanAPI, input *dynamodb.ScanInput) (*dynamodb.ScanOutput, error) {
	return api.Scan(c, input)
}

func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(os.Getenv("REGION")), config.WithEndpointResolver(aws.EndpointResolverFunc(
		func(service, region string) (aws.Endpoint, error) {
			return aws.Endpoint{URL: os.Getenv("DYNAMO_ENDPOINT")}, nil
		})))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	dynamoDBClient := dynamodb.NewFromConfig(cfg)
	client := &Client{
		hub: hub, conn: conn,
		dynamoDB: dynamoDBClient,
		send:     make(chan []byte, 256),
		userUUID: uuid.New(),
		hexColor: GetRandomColorInHex(),
	}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()

	// Get items in that year.
	filt1 := expression.Name("TenantUUID").Equal(expression.Value(tenantUUID))
	// Get items with a rating above the minimum.
	filt2 := expression.Name("SortKey").BeginsWith(fmt.Sprintf("draw#%s", targetUUID))

	// Get back the title and rating (we know the year).
	proj := expression.NamesList(
		expression.Name("TenantUUID"),
		expression.Name("SortKey"),
		expression.Name("OriginalCanvasCordinate"),
		expression.Name("NewCanvasCordinate"),
		expression.Name("HexColor"),
	)

	expr, err := expression.NewBuilder().WithFilter(filt1).WithFilter(filt2).WithProjection(proj).Build()
	if err != nil {
		fmt.Println("Got error building expression:")
		fmt.Println(err.Error())
		return
	}

	input := &dynamodb.ScanInput{
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		FilterExpression:          expr.Filter(),
		ProjectionExpression:      expr.Projection(),
		TableName:                 aws.String("tenant1"),
	}

	resp, err := GetItems(context.Background(), dynamoDBClient, input)
	if err != nil {
		fmt.Println("Got an error scanning the table:")
		fmt.Println(err.Error())
		return
	}

	items := []PaintedCanvasCoordinates{}

	err = attributevalue.UnmarshalListOfMaps(resp.Items, &items)
	if err != nil {
		panic(fmt.Sprintf("failed to unmarshal Dynamodb Scan Items, %v", err))
	}

	byteItems, err := json.Marshal(CanvasResponse{
		Type:                     "Stored",
		PaintedCanvasCoordinates: items,
	})
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	conn.WriteMessage(websocket.TextMessage, byteItems)
}
