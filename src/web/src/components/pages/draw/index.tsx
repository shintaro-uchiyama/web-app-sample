import React, { useRef } from "react";

export const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  if (canvas !== null) {
    const context = canvas.getContext("2d");
    if (context !== null) {
      context.fillStyle = "#E0FFFF";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>draw</p>
        <canvas ref={canvasRef} />
      </header>
    </div>
  );
};
