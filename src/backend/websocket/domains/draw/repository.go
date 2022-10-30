package draw

type (
	DrawRepository interface {
		GetDrawedCanvas() (Websockets, error)
		CreateDrawingCanvas(websocket *Websocket) error
	}
)
