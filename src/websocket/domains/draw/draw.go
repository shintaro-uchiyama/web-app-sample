package draw

import "encoding/json"

type (
	Draw struct {
		OriginalCoordinate Coordinate
		NewCoordinate      Coordinate
	}
	Coordinate struct {
		X int
		Y int
	}
)

func NewDraw(message []byte) (*Draw, error) {
	var draw Draw
	if err := json.Unmarshal(message, &draw); err != nil {
		return nil, err
	}
	return &Draw{
		OriginalCoordinate: draw.OriginalCoordinate,
		NewCoordinate:      draw.NewCoordinate,
	}, nil
}
