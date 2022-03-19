# 概要

db migration用のディレクトリ

## migrationファイル生成


```zsh
docker run -v ${PWD}/migrations:/migrations migrate/migrate:v4.15.1 -path=/migrations/ -database postgres://sales-db:5432/tenant1 create -ext sql -dir /migrations -seq create_uuid_ossp_extension
```

## migration実行

```zsh
docker run -v ${PWD}/migrations:/migrations --network host migrate/migrate:v4.15.1 -path=/migrations/ -database "postgres://postgres:J3fYk*u~@localhost:5432/tenant1?sslmode=disable" up
```
