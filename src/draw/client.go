package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/shintaro-uchiyama/web-app-sample/draw/infrastructures/dataaccessor"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
	tenantUUID     = "00000000-0000-0000-0000-000000000001"
	targetUUID     = "00000000-0000-0000-0000-000000000002"
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// FIXME: allow access from web
		return true
	},
}

type (
	Client struct {
		hub      *Hub
		conn     *websocket.Conn
		drawDA   dataaccessor.DrawDataAccessor
		send     chan []byte
		userUUID uuid.UUID
		hexColor string
	}
	CanvasCoordinate struct {
		X int `json:"x"`
		Y int `json:"y"`
	}
	PaintedCanvasCoordinate struct {
		OriginalCanvasCordinate CanvasCoordinate `json:"originalCanvasCordinate"`
		NewCanvasCordinate      CanvasCoordinate `json:"newCanvasCordinate"`
	}
	PaintedCanvasCoordinates struct {
		TenantUUID string
		SortKey    string
		PaintedCanvasCoordinate
		UserUUID string
		HexColor string `json:"hexColor"`
	}
	CanvasResponse struct {
		Type                     string
		PaintedCanvasCoordinates []*dataaccessor.PaintedCanvasCoordinates
		PaintedCanvasCoordinate  *dataaccessor.PaintedCanvasCoordinates
	}
)

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		var paintedCanvasCoordinate dataaccessor.PaintedCanvasCoordinate
		json.Unmarshal(message, &paintedCanvasCoordinate)

		item := &dataaccessor.PaintedCanvasCoordinates{
			TenantUUID:              tenantUUID,
			SortKey:                 fmt.Sprintf("draw#%s#%s#%s", targetUUID, c.userUUID.String(), time.Now().Format(time.RFC3339Nano)),
			PaintedCanvasCoordinate: paintedCanvasCoordinate,
			UserUUID:                c.userUUID.String(),
			HexColor:                c.hexColor,
		}
		if err := c.drawDA.CreateDrawCoordinate(item); err != nil {
			log.Fatalf("Got error marshalling new movie item: %s", err)
		}

		byteMessage, err := json.Marshal(CanvasResponse{
			Type:                    "Realtime",
			PaintedCanvasCoordinate: item,
		})
		if err != nil {
			log.Fatalf("json mershal error: %s", err)
		}

		c.hub.broadcast <- byteMessage
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	drawDataAccessor, err := dataaccessor.NewDrawDataAccessor()
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{
		hub:      hub,
		conn:     conn,
		drawDA:   drawDataAccessor,
		send:     make(chan []byte, 256),
		userUUID: uuid.New(),
		hexColor: r.URL.Query().Get("color"),
	}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()

	items, err := drawDataAccessor.GetDrawedCoordinates()
	if err != nil {
		log.Println(err)
		return
	}
	draws := make(map[string][]*dataaccessor.PaintedCanvasCoordinates)
	for _, v := range items {
		draws[v.HexColor] = append(draws[v.HexColor], v)
	}

	for _, v := range draws {
		byteItems, err := json.Marshal(CanvasResponse{
			Type:                     "Stored",
			PaintedCanvasCoordinates: v,
		})
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		conn.WriteMessage(websocket.TextMessage, byteItems)
	}
}
