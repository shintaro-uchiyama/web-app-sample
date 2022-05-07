package dataaccessor

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type (
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
	DrawDataAccessor interface {
		GetDrawedCoordinates() ([]*PaintedCanvasCoordinates, error)
		CreateDrawCoordinate(canvasCoordinate *PaintedCanvasCoordinates) error
	}
	drawDataAccessor struct {
		client *dynamodb.Client
	}
	DynamoDBScanAPI interface {
		Scan(ctx context.Context,
			params *dynamodb.ScanInput,
			optFns ...func(*dynamodb.Options)) (*dynamodb.ScanOutput, error)
	}
)

const (
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

func (a *drawDataAccessor) GetDrawedCoordinates() ([]*PaintedCanvasCoordinates, error) {
	filt1 := expression.Name("TenantUUID").Equal(expression.Value(tenantUUID))
	filt2 := expression.Name("SortKey").BeginsWith(fmt.Sprintf("draw#%s", targetUUID))

	proj := expression.NamesList(
		expression.Name("TenantUUID"),
		expression.Name("SortKey"),
		expression.Name("OriginalCanvasCordinate"),
		expression.Name("NewCanvasCordinate"),
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
		TableName:                 aws.String("tenant1"),
	})
	if err != nil {
		return nil, err
	}

	var items []*PaintedCanvasCoordinates
	if err = attributevalue.UnmarshalListOfMaps(resp.Items, &items); err != nil {
		return nil, err
	}

	return items, nil
}

func (a *drawDataAccessor) CreateDrawCoordinate(canvasCoordinate *PaintedCanvasCoordinates) error {
	av, err := attributevalue.MarshalMap(canvasCoordinate)
	if err != nil {
		return err
	}
	tableName := "tenant1"
	if _, err := a.client.PutItem(context.Background(), &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item:      av,
	}); err != nil {
		return err
	}
	return nil
}
