package usecases

import (
	"github.com/gorilla/websocket"
	"github.com/shintaro-uchiyama/web-app-sample/draw/domains/draw"
)

type (
	DrawUsecase interface {
		ShareDrawing(conn *websocket.Conn, hub *draw.Hub, color string) (draw.Websockets, error)
	}
	drawUsecase struct {
		drawRepo draw.DrawRepository
	}
)

func NewDrawUsecase(drawRepo draw.DrawRepository) *drawUsecase {
	return &drawUsecase{
		drawRepo,
	}
}

func (u *drawUsecase) ShareDrawing(conn *websocket.Conn, hub *draw.Hub, color string) (draw.Websockets, error) {
	client := draw.NewClient(conn, hub, color, u.drawRepo)
	hub.RegisterClient(client)

	go client.WritePump()
	go client.ReadPump()

	return u.drawRepo.GetDrawedCanvas()
}
