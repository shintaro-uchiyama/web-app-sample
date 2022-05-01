import React, { useEffect, useRef } from "react";

export const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#E0FFFF";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) {
        draw(context);
      }
    }
  }, [draw]);

  return (
    <div className="App">
      <header className="App-header">
        <p>draw</p>
        <canvas ref={canvasRef} />
      </header>
    </div>
  );
};
