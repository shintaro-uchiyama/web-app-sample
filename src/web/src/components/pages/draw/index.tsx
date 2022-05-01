import React, { useEffect, useRef } from "react";
import {useCanvas} from "../../../hooks"

export const Draw = () => {

  const {canvasRef} = useCanvas()

  return (
    <div className="App">
      <header className="App-header">
        <p>draw</p>
        <canvas ref={canvasRef} />
      </header>
    </div>
  );
};
