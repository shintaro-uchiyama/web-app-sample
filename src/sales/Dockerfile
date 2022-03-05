FROM golang:1.17.8-bullseye
WORKDIR /app

# Set permitted directory for golang build cache
ENV XDG_CACHE_HOME=/tmp/.cache

COPY ./go.mod /app/go.mod
COPY ./go.sum /app/go.sum
RUN go mod download

COPY ./.air.toml /app/.air.toml
RUN chown -R 1000:root /app
RUN go install github.com/cosmtrek/air@v1.29.0 && \
    go get -u google.golang.org/grpc

COPY . /app
RUN chown -R 1000:root /app
RUN chown -R 1000:root /go

CMD ["air", "-c", ".air.toml"]