package main

import (
	"flag"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))

	hub := newHub()
	go hub.run()

	r.GET("/ws/", func(ctx *gin.Context) {
		serveWs(hub, ctx.Writer, ctx.Request)
	})

	r.Run()
}
