#!/bin/bash
docker run \
  -e \
    AWS_ACCESS_KEY_ID=fake_access_key \
  -e \
    AWS_SECRET_ACCESS_KEY=fake_secret_access_key \
  -e \
    DYNAMODB_REGION=ap-northeast-1 \
  --rm \
  -it \
  amazon/aws-cli:2.6.2 \
  dynamodb \
  create-table \
  --region ap-northeast-1 \
  --endpoint-url http://host.docker.internal:8000 \
  --table-name tenant1 \
  --attribute-definitions \
    AttributeName=TenantUUID,AttributeType=S \
    AttributeName=SortKey,AttributeType=S \
  --key-schema \
    AttributeName=TenantUUID,KeyType=HASH \
    AttributeName=SortKey,KeyType=RANGE \
  --provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --table-class STANDARD