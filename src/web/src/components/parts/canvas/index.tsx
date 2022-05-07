import { useCanvas } from "../../../hooks";

export const Canvas = () => {
  const { canvasRef } = useCanvas();

  return (
    <canvas
      className="border-2 border-red-200"
      ref={canvasRef}
      width={600}
      height={400}
    />
  );
};
