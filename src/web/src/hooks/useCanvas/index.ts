import { useCallback, useEffect, useRef, useState } from "react";

interface CanvasCoordinate {
  x: number;
  y: number;
}

interface PaintedCanvasCoordinate {
  originalCanvasCordinate: CanvasCoordinate;
  newCanvasCordinate: CanvasCoordinate;
}
interface PaintedCanvasCoordinate2 {
  tenantUUID: string;
  sortKey: string;
  originalCanvasCordinate: CanvasCoordinate;
  newCanvasCordinate: CanvasCoordinate;
  userUUID: string;
  hexColor: string;
}
interface CanvasResponse {
  Type: string;
  PaintedCanvasCoordinates: PaintedCanvasCoordinate2[];
  PaintedCanvasCoordinate: PaintedCanvasCoordinate2;
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
      console.log("event: ", event);
      if (!canvasRef.current) {
        return;
      }
      const canvas = canvasRef.current;
      let context = canvas.getContext("2d");
      if (!context) return;

      var paintedCanvasCoordinates = event.data.split("\n");
      for (var i = 0; i < paintedCanvasCoordinates.length; i++) {
        const tmp = JSON.parse(paintedCanvasCoordinates[i]);
        const { Type, PaintedCanvasCoordinate, PaintedCanvasCoordinates } =
          tmp as CanvasResponse;
        if (Type === "Stored") {
          /*
          PaintedCanvasCoordinates.sort((a, b) => {
            const hexColorA = a.hexColor.toUpperCase();
            const hexColorB = b.hexColor.toUpperCase();
            if (hexColorA < hexColorB) {
              return -1;
            }
            if (hexColorA > hexColorB) {
              return 1;
            }

            return 0;
          });
          */

          // let prevHexColor = "";
          context.lineJoin = "round";
          context.lineWidth = 1;
          context.beginPath();
          PaintedCanvasCoordinates.forEach((t) => {
            if (!context) return;
            context.strokeStyle = t.hexColor;
            context.moveTo(
              t.originalCanvasCordinate.x,
              t.originalCanvasCordinate.y
            );
            context.lineTo(t.newCanvasCordinate.x, t.newCanvasCordinate.y);
            /*
            if (prevHexColor === "") {
              console.log("start");
              console.log("color", t.hexColor);
              context = canvas.getContext("2d");
              if (context) {
                context.strokeStyle = t.hexColor;
                context.lineJoin = "round";
                context.lineWidth = 1;
                context.beginPath();
              }
            } else if (prevHexColor !== t.hexColor) {
              console.log("color change");
              console.log("color", t.hexColor);
              if (context) {
                context.closePath();
                context.stroke();
              }

              context = canvas.getContext("2d");
              if (context) {
                context.strokeStyle = t.hexColor;
                context.lineJoin = "round";
                context.lineWidth = 1;
                context.beginPath();
              }
            }
            if (context) {
              context.moveTo(
                t.originalCanvasCordinate.x,
                t.originalCanvasCordinate.y
              );
              context.lineTo(t.newCanvasCordinate.x, t.newCanvasCordinate.y);
            }
            prevHexColor = t.hexColor;
            */
          });

          console.log("final");
          context.closePath();
          context.stroke();
        } else if (Type === "Realtime") {
          const { originalCanvasCordinate, newCanvasCordinate, hexColor } =
            PaintedCanvasCoordinate;
          drawLine(originalCanvasCordinate, newCanvasCordinate, hexColor);
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
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
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
    console.log("passs");
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
      context.moveTo(originalCanvasCordinate.x, originalCanvasCordinate.y);
      context.lineTo(newCanvasCordinate.x, newCanvasCordinate.y);
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
            originalCanvasCordinate: canvasCoordinate,
            newCanvasCordinate,
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
