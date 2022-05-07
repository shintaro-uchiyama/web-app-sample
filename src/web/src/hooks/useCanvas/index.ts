import { useCallback, useEffect, useRef, useState } from "react";

interface CanvasCoordinate {
  X: number;
  Y: number;
}

interface PaintedCanvasCoordinate {
  OriginalCoordinate: CanvasCoordinate;
  NewCoordinate: CanvasCoordinate;
}
interface PaintedCanvasCoordinate2 {
  tenantUUID: string;
  sortKey: string;
  OriginalCoordinate: CanvasCoordinate;
  NewCoordinate: CanvasCoordinate;
  userUUID: string;
  hexColor: string;
}
interface CanvasResponse {
  WebsocketType: string;
  HexColor: string;
  Drawed: PaintedCanvasCoordinate2[];
  Draw: PaintedCanvasCoordinate2;
}

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const socketRef = useRef<WebSocket>();

  var drawColor: string;

  const storedColor = sessionStorage.getItem("drawColor");
  if (!storedColor) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    sessionStorage.setItem("drawColor", randomColor);
    drawColor = randomColor;
  } else {
    drawColor = storedColor as string;
  }

  useEffect(() => {
    socketRef.current = new WebSocket(
      `ws://localhost:8081/ws/?color=${encodeURIComponent(drawColor)}`
    );

    socketRef.current.onmessage = (event) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas = canvasRef.current;
      let context = canvas.getContext("2d");
      if (!context) return;

      var paintedCanvasCoordinates = event.data.split("\n");
      for (var i = 0; i < paintedCanvasCoordinates.length; i++) {
        const tmp = JSON.parse(paintedCanvasCoordinates[i]);
        const { WebsocketType, HexColor, Draw, Drawed } = tmp as CanvasResponse;
        console.log("t: ", tmp);
        if (WebsocketType === "Drawed") {
          context.lineJoin = "round";
          context.lineWidth = 1;
          context.strokeStyle = HexColor;
          context.beginPath();
          Drawed.forEach((t) => {
            if (!context) return;
            context.moveTo(t.OriginalCoordinate.X, t.OriginalCoordinate.Y);
            context.lineTo(t.NewCoordinate.X, t.NewCoordinate.Y);
          });

          context.closePath();
          context.stroke();
        } else if (WebsocketType === "Drawing") {
          const { OriginalCoordinate, NewCoordinate } = Draw;
          drawLine(OriginalCoordinate, NewCoordinate, HexColor);
        }
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const [isPainting, setIsPainting] = useState(false);
  const [canvasCoordinate, setCanvasCoordinate] = useState<
    CanvasCoordinate | undefined
  >(undefined);

  const getCanvasCoordinate = (
    event: MouseEvent
  ): CanvasCoordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return {
      X: event.pageX - canvas.offsetLeft,
      Y: event.pageY - canvas.offsetTop,
    };
  };

  // Start paint
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCanvasCoordinate(event);
    if (coordinates) {
      setIsPainting(true);
      setCanvasCoordinate(coordinates);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  // Paint
  const drawLine = (
    originalCanvasCordinate: CanvasCoordinate,
    newCanvasCordinate: CanvasCoordinate,
    hexColor: string
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = hexColor;
      context.lineJoin = "round";
      context.lineWidth = 1;

      context.beginPath();
      context.moveTo(originalCanvasCordinate.X, originalCanvasCordinate.Y);
      context.lineTo(newCanvasCordinate.X, newCanvasCordinate.Y);
      context.closePath();

      context.stroke();
    }
  };

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newCanvasCordinate = getCanvasCoordinate(event);
        if (canvasCoordinate && newCanvasCordinate) {
          drawLine(canvasCoordinate, newCanvasCordinate, drawColor);
          setCanvasCoordinate(newCanvasCordinate);
          if (!socketRef.current) return;

          const paintedCanvasCoordinate: PaintedCanvasCoordinate = {
            OriginalCoordinate: canvasCoordinate,
            NewCoordinate: newCanvasCordinate,
          };
          socketRef.current.send(JSON.stringify(paintedCanvasCoordinate));
        }
      }
    },
    [isPainting, canvasCoordinate]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  // Exit paint
  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  return {
    canvasRef,
  };
};
