import React, { DragEvent, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import useVerticalResizer from "../../../hooks/useVerticalResizer";

function Companies() {
  const { refs, resize } = useVerticalResizer();
  const onDragHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!e.pageY) return;
    resize(e.pageY);
  };
  return (
    <div className="h-screen">
      <div ref={refs.upperDivRef} className="bg-amber-200 h-64">
        リサイズエリア２
      </div>
      <div
        ref={refs.resizerDivRef}
        draggable="true"
        className="relative cursor-pointer !mt-0"
        onDrag={onDragHandler}
      >
        <div className="bg-gray-300 h-1 z-0"></div>
        <FontAwesomeIcon
          icon={faCircleChevronUp}
          fill="currentColor"
          size="xs"
          className="absolute top-[-4px] z-10"
        />
      </div>
      <div ref={refs.lowerDivRef} className={`bg-red-50 h-full !mt-0`}>
        リサイズエリア３
      </div>
    </div>
  );
}

export default Companies;
