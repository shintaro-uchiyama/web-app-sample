#!/bin/bash

# TODO: adjust to user's shell(bash, sh, fish, etc...)
touch ~/.bash_profile
if [ ! "$(cat ~/.bash_profile | grep WEBAPP_POSTGRES_PASSWORD)" ] ;then
  echo "export WEBAPP_POSTGRES_PASSWORD=$(openssl rand -base64 12 | fold -w 8 | head -1)" >> ~/.bash_profile
fi
if [ ! "$(cat ~/.bash_profile | grep WEBAPP_PGADMIN_DEFAULT_PASSWOR)" ] ;then
  echo "export WEBAPP_PGADMIN_DEFAULT_PASSWORD=$(openssl rand -base64 12 | fold -w 8 | head -1)" >> ~/.bash_profile
fi
if [ ! "$(cat ~/.bash_profile | grep WEBAPP_POSTGRES_USER)" ] ;then
  echo "export WEBAPP_POSTGRES_USER=postgres" >> ~/.bash_profile
fi
if [ ! "$(cat ~/.bash_profile | grep WEBAPP_POSTGRES_DB)" ] ;then
  echo "export WEBAPP_POSTGRES_DB=tenant1" >> ~/.bash_profile
fi

source ~/.bash_profile
envsubst < .env.template > .env