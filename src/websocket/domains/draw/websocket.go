package draw

type (
	WebsocketType string
	Websocket     struct {
		WebsocketType WebsocketType
		UserUUID      string
		HexColor      string
		Draw          *Draw
		Drawed        []*Draw
	}
	Websockets map[string]*Websocket
)

const (
	DrawedType  WebsocketType = "Drawed"
	DrawingType WebsocketType = "Drawing"
)

func NewDrawingWebsocket(message []byte, hexColor string) (*Websocket, error) {
	draw, err := NewDraw(message)
	if err != nil {
		return nil, err
	}
	return &Websocket{
		WebsocketType: DrawingType,
		HexColor:      hexColor,
		Draw:          draw,
	}, nil
}
