package main

import (
	"log"

	sw "github.com/shintaro-uchiyama/web-app-sample/sales/cmd/api-document/out/go/go"
)

func main() {
	log.Printf("Server started")

	router := sw.NewRouter()

	log.Fatal(router.Run(":8080"))
}
