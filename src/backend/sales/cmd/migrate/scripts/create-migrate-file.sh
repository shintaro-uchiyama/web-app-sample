#!/bin/sh
if [ "$#" -eq 1 ]; then
  docker run -v ${PWD}/migrations:/migrations migrate/migrate:v4.15.1 create -ext sql -dir /migrations -seq $1
else
  echo "Please add migration file name arg."
fi