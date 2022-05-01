import { useCallback, useEffect, useRef, useState } from "react";

interface CanvasCoordinate {
  x: number;
  y: number;
}

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        const newMousePosition = getCanvasCoordinate(event);
        if (canvasCoordinate && newMousePosition) {
          drawLine(canvasCoordinate, newMousePosition);
          setCanvasCoordinate(newMousePosition);
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
