import React, { DragEvent, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";

function Companies() {
  const area2 = useRef<HTMLDivElement>(null);
  const area3 = useRef<HTMLDivElement>(null);
  const resizer = useRef<HTMLDivElement>(null);
  const yResizeStart = (e: DragEvent<HTMLDivElement>) => {
    console.log("drag start");
  };
  const yResizeEnd = (e: DragEvent<HTMLDivElement>) => {
    console.log("drag end");
  };
  const changeHeight = (y: number) => {
    const element2 = area2.current;
    if (element2 === null) return;
    const element3 = area3.current;
    if (element3 === null) return;
    const resizerY = resizer.current;
    if (resizerY === null) return;
    const adjust: number =
      element2.offsetTop + // element2 上端
      2 *
        (parseInt(element2.style.border) ||
          0 + parseInt(element2.style.padding) ||
          0) + // element2 上下 border,padding
      resizerY.offsetHeight; // resizerY 高さ
    const el2height: number = y - adjust;
    console.log("y: ", y);
    console.log("adjust: ", adjust);
    console.log("element2.style.border: ", element2.style.border);
    console.log("element2.style.padding: ", element2.style.padding);
    element2.style.height = el2height + "px";
    const el3height: number =
      el2height +
      2 *
        (parseInt(element2.style.border) ||
          0 + parseInt(element2.style.padding) ||
          0) - // element2
      resizerY.offsetHeight - // resizerY
      2 *
        (parseInt(element3.style.border) ||
          0 + parseInt(element3.style.padding) ||
          0); // element3
    element3.style.height = el3height + "px";
  };
  const yResize = (e: DragEvent<HTMLDivElement>) => {
    if (e.pageY) {
      changeHeight(e.pageY);
    }
  };
  return (
    <>
      <div id="element2" ref={area2}>
        リサイズエリア２
      </div>
      <div
        id="resizerY"
        ref={resizer}
        draggable="true"
        className="relative"
        onDragStart={yResizeStart}
        onDragEnd={yResizeEnd}
        onDrag={yResize}
      >
        <div className="bg-gray-300 h-1 z-0"></div>
        <FontAwesomeIcon
          icon={faCircleChevronUp}
          fill="currentColor"
          size="xs"
          className="absolute top-[-4px] z-10"
        />
      </div>
      <div ref={area3} className={`bg-red-50 m-y0`}>
        リサイズエリア３
      </div>
    </>
  );
}

export default Companies;
