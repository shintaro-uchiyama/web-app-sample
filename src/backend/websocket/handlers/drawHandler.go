package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/shintaro-uchiyama/web-app-sample/draw/domains/draw"
	"github.com/shintaro-uchiyama/web-app-sample/draw/usecases"
)

type (
	DrawHandler interface {
		ShareDrawing(hub *draw.Hub) gin.HandlerFunc
	}
	drawHandler struct {
		drawUsecase usecases.DrawUsecase
	}
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			// FIXME: allow access from web
			return true
		},
	}
)

func NewDrawHandler(drawUsecase usecases.DrawUsecase) *drawHandler {
	return &drawHandler{
		drawUsecase,
	}
}

func (h *drawHandler) ShareDrawing(hub *draw.Hub) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		r := ctx.Request
		conn, err := upgrader.Upgrade(ctx.Writer, r, nil)
		if err != nil {
			ctx.AbortWithError(http.StatusInternalServerError, err)
			return
		}

		// create read and write websocket go routine tot share drawing
		drawedCanvasCoordinates, err := h.drawUsecase.ShareDrawing(conn, hub, r.URL.Query().Get("color"))
		if err != nil {
			ctx.AbortWithError(http.StatusInternalServerError, err)
			return
		}

		// FIXME: get painted info from REST API because it's simple and make coding easy
		for _, colorAggregatedCoordinates := range drawedCanvasCoordinates {
			byteMessage, err := json.Marshal(colorAggregatedCoordinates)
			if err != nil {
				ctx.AbortWithError(http.StatusInternalServerError, err)
				return
			}
			conn.WriteMessage(websocket.TextMessage, byteMessage)
		}
	}
}
