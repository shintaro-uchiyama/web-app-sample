package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// FIXME: allow access from web
		return true
	},
}

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))

	r.GET("/ws/", func(ctx *gin.Context) {
		c, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			log.Print("upgrade:", err)
			return
		}
		defer c.Close()

		for {
			mt, message, err := c.ReadMessage()
			log.Println("message:", message)
			if err != nil {
				log.Println("read:", err)
				break
			}
			log.Printf("recv: %s", message)
			if string(message) == "ping" {
				message = []byte("pong")
			}
			err = c.WriteMessage(mt, message)
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
	})
	r.Run()
}
