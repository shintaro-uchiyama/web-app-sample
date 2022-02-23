import React, { useRef } from "react";

interface IUseVerticalResizer {
  refs: {
    upperDivRef: React.RefObject<HTMLDivElement>;
    lowerDivRef: React.RefObject<HTMLDivElement>;
    resizerDivRef: React.RefObject<HTMLDivElement>;
  };
  resize: (y: number) => void;
}

const useVerticalResizer = (): IUseVerticalResizer => {
  const upperDivRef = useRef<HTMLDivElement>(null);
  const resizerDivRef = useRef<HTMLDivElement>(null);
  const lowerDivRef = useRef<HTMLDivElement>(null);

  const resize = (y: number) => {
    const upperDiv = upperDivRef.current;
    if (upperDiv === null) return;
    const lowerDiv = lowerDivRef.current;
    if (lowerDiv === null) return;
    const resizerDiv = resizerDivRef.current;
    if (resizerDiv === null) return;

    const adjust: number =
      upperDiv.offsetTop + // upperDiv 上端
      2 *
        (parseInt(upperDiv.style.border) ||
          0 + parseInt(upperDiv.style.padding) ||
          0) + // upperDiv 上下 border,padding
      resizerDiv.offsetHeight; // resizerDiv 高さ
    const el2height: number = y - adjust;
    upperDiv.style.height = el2height + "px";

    const el3height: number =
      el2height +
      2 *
        (parseInt(upperDiv.style.border) ||
          0 + parseInt(upperDiv.style.padding) ||
          0) - // upperDiv
      resizerDiv.offsetHeight - // resizerDiv
      2 *
        (parseInt(lowerDiv.style.border) ||
          0 + parseInt(lowerDiv.style.padding) ||
          0); // lowerDiv
    lowerDiv.style.height = el3height + "px";
  };
  return {
    refs: { upperDivRef, lowerDivRef, resizerDivRef },
    resize,
  };
};
export default useVerticalResizer;
