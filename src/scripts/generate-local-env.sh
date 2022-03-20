#!/bin/sh

# TODO: adjust to user's shell(bash, sh, fish, etc...)
if [ ! "$(cat ~/.zshrc | grep WEBAPP_POSTGRES_PASSWORD )" ] ;then
  echo "export WEBAPP_POSTGRES_PASSWORD=$(openssl rand -base64 8)" >> ~/.zshrc
  echo "export WEBAPP_PGADMIN_DEFAULT_PASSWORD=$(openssl rand -base64 8)" >> ~/.zshrc
fi

if [ ! -e ".env" ];then
  envsubst < .env.template > .env
fi