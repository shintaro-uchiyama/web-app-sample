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
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
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
	}
	CanvasCoordinate struct {
		X int `json:"x"`
		Y int `json:"y"`
	}
	PaintedCanvasCoordinate struct {
		OriginalCanvasCordinate CanvasCoordinate `json:"originalCanvasCordinate"`
		NewCanvasCordinate      CanvasCoordinate `json:"newCanvasCordinate"`
	}
	Item struct {
		Year   int
		Title  string
		Plot   string
		Rating float64
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

		fmt.Println("---")
		fmt.Println(fmt.Printf("paintedCanvasCoordinate: %+v", paintedCanvasCoordinate))
		item := Item{
			Year:   2015,
			Title:  "The Big New Movie",
			Plot:   "Nothing happens at all.",
			Rating: 0.0,
		}

		av, err := attributevalue.MarshalMap(item)
		if err != nil {
			log.Fatalf("Got error marshalling new movie item: %s", err)
		}
		if _, err := c.dynamoDB.PutItem(context.Background(), &dynamodb.PutItemInput{
			// TODO: get dynamodb table name per tenant
			TableName: aws.String("tenant1"),
			Item:      av,
		}); err != nil {
			log.Fatalf("failed to put item, %v", err)
		}

		c.hub.broadcast <- message
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

	client := &Client{
		hub: hub, conn: conn,
		dynamoDB: dynamodb.NewFromConfig(cfg),
		send:     make(chan []byte, 256),
	}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()
}
