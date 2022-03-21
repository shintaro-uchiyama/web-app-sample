#!/bin/sh
# set env values by execiting make setup or make init command at src directory
docker run -v ${PWD}/migrations:/migrations --network host migrate/migrate:v4.15.1 -path=/migrations/ -database "postgres://${WEBAPP_POSTGRES_USER}:${WEBAPP_POSTGRES_PASSWORD}@localhost:5432/${WEBAPP_POSTGRES_DB}?sslmode=disable" up