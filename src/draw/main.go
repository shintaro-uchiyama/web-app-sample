package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/shintaro-uchiyama/web-app-sample/draw/domains/draw"
	"github.com/shintaro-uchiyama/web-app-sample/draw/handlers"
	"github.com/shintaro-uchiyama/web-app-sample/draw/infrastructures/dataaccessor"
	"github.com/shintaro-uchiyama/web-app-sample/draw/usecases"
)

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	r.Use(cors.New(config))

	hub := draw.NewHub()
	go hub.Run()

	drawDA, err := dataaccessor.NewDrawDataAccessor()
	if err != nil {
		log.Fatalf("New draw data accessor error: %v", err)
	}
	drawUsecase := usecases.NewDrawUsecase(drawDA)
	drawHandler := handlers.NewDrawHandler(drawUsecase)

	r.GET("/draw/", drawHandler.ShareDrawing(hub))

	r.Run()
}
