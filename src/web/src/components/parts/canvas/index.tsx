import { useEffect, useRef } from "react";
import { useCanvas } from "../../../hooks";

export const Canvas = () => {
  const { canvasRef } = useCanvas();

  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    console.log("Connectinng..");

    socketRef.current = new WebSocket("ws://localhost:8081/ws/");

    socketRef.current.onmessage = (event) => {
      console.log("event: ", event);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const handleClick = () => {
    if (!socketRef.current) return;

    socketRef.current.send("ping");
  };

  return (
    <>
      <button onClick={handleClick}>aaa</button>
      <canvas
        className="border-2 border-red-200"
        ref={canvasRef}
        width={600}
        height={400}
      />
    </>
  );
};
