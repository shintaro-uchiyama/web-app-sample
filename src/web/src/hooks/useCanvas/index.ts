import { useEffect, useRef } from "react";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#B163A3";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    draw(ctx);
  }, [draw]);

  return {
    canvasRef,
  };
};
