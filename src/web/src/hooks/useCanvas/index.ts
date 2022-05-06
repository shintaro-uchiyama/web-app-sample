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
}
interface CanvasResponse {
  Type: string;
  PaintedCanvasCoordinates: PaintedCanvasCoordinate2[];
  PaintedCanvasCoordinate: PaintedCanvasCoordinate;
}

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8081/ws/");

    socketRef.current.onmessage = (event) => {
      var paintedCanvasCoordinates = event.data.split("\n");
      for (var i = 0; i < paintedCanvasCoordinates.length; i++) {
        const tmp = JSON.parse(paintedCanvasCoordinates[i]);
        const { Type, PaintedCanvasCoordinate, PaintedCanvasCoordinates } =
          tmp as CanvasResponse;
        if (Type === "Stored") {
          if (!canvasRef.current) {
            return;
          }
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          if (!context) return;
          context.strokeStyle = "red";
          context.lineJoin = "round";
          context.lineWidth = 1;
          context.beginPath();

          PaintedCanvasCoordinates.forEach((t) => {
            context.moveTo(
              t.originalCanvasCordinate.x,
              t.originalCanvasCordinate.y
            );
            context.lineTo(t.newCanvasCordinate.x, t.newCanvasCordinate.y);
          });

          context.closePath();
          context.stroke();
        } else if (Type === "Realtime") {
          const { originalCanvasCordinate, newCanvasCordinate } =
            PaintedCanvasCoordinate;
          drawLine(originalCanvasCordinate, newCanvasCordinate);
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
    newCanvasCordinate: CanvasCoordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = "red";
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
          drawLine(canvasCoordinate, newCanvasCordinate);
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
