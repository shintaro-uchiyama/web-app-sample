package dataaccessor

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/shintaro-uchiyama/web-app-sample/draw/domains/draw"
)

type (
	drawDataAccessor struct {
		client *dynamodb.Client
	}
	CanvasInfo struct {
		TenantUUID string
		SortKey    string
		UserUUID   string
		HexColor   string
		*draw.Draw
	}
)

const (
	// TODO: get sql values from request
	tableName  = "tenant1"
	tenantUUID = "00000000-0000-0000-0000-000000000001"
	targetUUID = "00000000-0000-0000-0000-000000000002"
)

func NewDrawDataAccessor() (*drawDataAccessor, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(os.Getenv("REGION")), config.WithEndpointResolver(aws.EndpointResolverFunc(
		func(service, region string) (aws.Endpoint, error) {
			return aws.Endpoint{URL: os.Getenv("DYNAMO_ENDPOINT")}, nil
		})))
	if err != nil {
		return nil, err
	}

	return &drawDataAccessor{
		client: dynamodb.NewFromConfig(cfg),
	}, nil
}

func (a *drawDataAccessor) GetDrawedCanvas() (draw.Websockets, error) {
	filt1 := expression.Name("TenantUUID").Equal(expression.Value(tenantUUID))
	filt2 := expression.Name("SortKey").BeginsWith(fmt.Sprintf("draw#%s", targetUUID))

	proj := expression.NamesList(
		expression.Name("TenantUUID"),
		expression.Name("SortKey"),
		expression.Name("OriginalCoordinate"),
		expression.Name("NewCoordinate"),
		expression.Name("HexColor"),
	)

	expr, err := expression.NewBuilder().WithFilter(filt1).WithFilter(filt2).WithProjection(proj).Build()
	if err != nil {
		return nil, err
	}

	resp, err := a.client.Scan(context.Background(), &dynamodb.ScanInput{
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		FilterExpression:          expr.Filter(),
		ProjectionExpression:      expr.Projection(),
		TableName:                 aws.String(tableName),
	})
	if err != nil {
		return nil, err
	}

	var canvasInfos []CanvasInfo
	if err = attributevalue.UnmarshalListOfMaps(resp.Items, &canvasInfos); err != nil {
		return nil, err
	}

	drawedWebsockets := make(draw.Websockets)
	for _, canvasInfo := range canvasInfos {
		if _, ok := drawedWebsockets[canvasInfo.HexColor]; !ok {
			drawedWebsockets[canvasInfo.HexColor] = &draw.Websocket{
				WebsocketType: draw.DrawedType,
				UserUUID:      canvasInfo.UserUUID,
				HexColor:      canvasInfo.HexColor,
			}
		}
		drawedWebsockets[canvasInfo.HexColor].Drawed = append(
			drawedWebsockets[canvasInfo.HexColor].Drawed,
			&draw.Draw{
				OriginalCoordinate: canvasInfo.OriginalCoordinate,
				NewCoordinate:      canvasInfo.NewCoordinate,
			},
		)
	}

	return drawedWebsockets, nil
}

func (a *drawDataAccessor) CreateDrawingCanvas(websocket *draw.Websocket) error {
	av, err := attributevalue.MarshalMap(CanvasInfo{
		TenantUUID: tenantUUID,
		SortKey: fmt.Sprintf(
			"draw#%s#%s#%s",
			targetUUID,
			websocket.UserUUID,
			time.Now().Format(time.RFC3339Nano),
		),
		HexColor: websocket.HexColor,
		Draw:     websocket.Draw,
	})
	if err != nil {
		return err
	}
	if _, err := a.client.PutItem(context.Background(), &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item:      av,
	}); err != nil {
		return err
	}
	return nil
}
