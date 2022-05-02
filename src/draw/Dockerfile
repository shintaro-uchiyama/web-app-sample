FROM golang:1.18.1-bullseye
WORKDIR /app

COPY ./go.mod /app/go.mod
COPY ./go.sum /app/go.sum
RUN go mod download

COPY ./.air.toml /app/.air.toml
RUN go install github.com/cosmtrek/air@v1.29.0 && \
    go get -u google.golang.org/grpc

COPY . /app

CMD ["air", "-c", ".air.toml"]