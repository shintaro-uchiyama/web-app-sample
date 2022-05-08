#!/bin/bash

docker run \
  -e \
    AWS_ACCESS_KEY_ID=fake_access_key \
  -e \
    AWS_SECRET_ACCESS_KEY=fake_secret_access_key \
  --rm \
  -it \
  -v $(pwd):/aws \
  amazon/aws-cli:2.6.2 \
  stepfunctions \
  --endpoint-url http://host.docker.internal:8083 \
  start-execution \
  --region ap-northeast-1 \
  --state-machine-arn arn:aws:states:ap-northeast-1:123456789012:stateMachine:HelloWorld