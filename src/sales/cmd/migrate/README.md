# 概要

create

```zsh
docker run -v ${PWD}/db/migrations:/migrations migrate/migrate -path=/migrations/ -database postgres://sales-db:5432/tenant1 create -ext sql -dir /migrations -seq create_activities_table
```