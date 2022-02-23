import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { DragEvent } from "react";
import useVerticalResizer from "../../../hooks/useVerticalResizer";
import { FilterTable } from "../../parts/tables";

function Companies() {
  const { refs, resize } = useVerticalResizer();
  const onDragHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!e.pageY) return;
    resize(e.pageY);
  };
  return (
    <div className="h-screen">
      <div ref={refs.upperDivRef} className="h-64 overflow-y-auto">
        <FilterTable />
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
      <div ref={refs.lowerDivRef} className={`h-full !mt-0`}>
        リサイズエリア３
      </div>
    </div>
  );
}

export default Companies;
