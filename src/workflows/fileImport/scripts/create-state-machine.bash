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
  create-state-machine \
  --region ap-northeast-1 \
  --definition file://definition.json \
  --name "HelloWorld" \
  --role-arn "arn:aws:iam::012345678901:role/DummyRole"