#!/bin/zsh

# TODO: adjust to user's shell(bash, sh, fish, etc...)
touch ~/.zshenv
if [ ! "$(cat ~/.zshenv | grep WEBAPP_POSTGRES_PASSWORD)" ] ;then
  echo "export WEBAPP_POSTGRES_PASSWORD=$(openssl rand -base64 12 | fold -w 8 | head -1)" >> ~/.zshenv
fi
if [ ! "$(cat ~/.zshenv | grep WEBAPP_PGADMIN_DEFAULT_PASSWOR)" ] ;then
  echo "export WEBAPP_PGADMIN_DEFAULT_PASSWORD=$(openssl rand -base64 12 | fold -w 8 | head -1)" >> ~/.zshenv
fi
if [ ! "$(cat ~/.zshenv | grep WEBAPP_POSTGRES_USER)" ] ;then
  echo "export WEBAPP_POSTGRES_USER=postgres" >> ~/.zshenv
fi
if [ ! "$(cat ~/.zshenv | grep WEBAPP_POSTGRES_DB)" ] ;then
  echo "export WEBAPP_POSTGRES_DB=tenant1" >> ~/.zshenv
fi

source ~/.zshenv
envsubst < .env.template > .env