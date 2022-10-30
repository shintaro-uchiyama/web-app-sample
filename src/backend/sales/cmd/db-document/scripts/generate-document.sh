#!/bin/sh
# set env values by execiting make setup or make init command at src directory
docker run -v "$PWD/output:/output" --net=host schemaspy/schemaspy:snapshot -t pgsql -db ${WEBAPP_POSTGRES_DB} -s public -host localhost -port 5432 -u ${WEBAPP_POSTGRES_USER} -p ${WEBAPP_POSTGRES_PASSWORD}