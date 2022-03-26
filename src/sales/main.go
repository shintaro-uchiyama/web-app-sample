package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	fmt.Println("Hello golang from docker!")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		dsn := fmt.Sprintf(
			"host=sales-db user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Tokyo",
			os.Getenv("POSTGRES_USER"),
			os.Getenv("POSTGRES_PASSWORD"),
			os.Getenv("POSTGRES_DB"),
		)
		_, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			c.JSON(500, gin.H{
				"message": fmt.Sprintf("db init error: %s", err),
			})
		}
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run()
}
