import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { DragEvent } from "react";
import useVerticalResizer from "@/hooks/useVerticalResizer";
import { FilterTable } from "@/components/parts/tables";

function Companies() {
  const { refs, resize } = useVerticalResizer();
  const onDragHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!e.pageY) return;
    resize(e.pageY);
  };
  // set empty gif to avoid unexpected icon during drag and drop in chrome
  const blankImg = new Image();
  blankImg.src =
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  return (
    <div className="h-screen">
      <div ref={refs.upperDivRef} className="h-64 overflow-y-auto">
        <FilterTable />
      </div>
      <div
        ref={refs.resizerDivRef}
        className="relative !mt-0 cursor-grab active:cursor-grabbing"
        onDrag={onDragHandler}
        onDragStart={(e) => {
          e.dataTransfer.setDragImage(blankImg, 0, 0);
        }}
        onMouseMove={(e) => {}}
        draggable="true"
      >
        <div className="bg-gray-300 h-1 z-0"></div>
        <FontAwesomeIcon
          icon={faCircleChevronUp}
          fill="currentColor"
          size="sm"
          className="absolute top-[-4px] z-10"
        />
      </div>
      <div ref={refs.lowerDivRef} className={`h-full !mt-0`}></div>
    </div>
  );
}

export default Companies;
