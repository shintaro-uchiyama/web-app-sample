import Quill, { Sources } from "quill";
import React, { useEffect, useRef } from "react";

interface IUseEditor {
  editorRef: React.RefObject<HTMLDivElement>;
}

const useEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "bubble",
      placeholder: "test",
    });

    quill.on(
      "text-change",
      (_delta: any, _oldContents: any, source: Sources) => {
        if (source !== "user") return;

        const text = quill.getText();
        quill.formatText(0, text.length, "color", "white");
        [...text.matchAll(/[a-zA-Z][1-9]/g)].forEach((match) => {
          if (!match.index) return;
          quill.formatText(match.index, match[0].length, "color", "red");
          quill.formatText(
            match.index + match[0].length,
            text.length - (match.index + match[0].length),
            "color",
            "white"
          );
        });
      }
    );
  }, [editorRef]);

  return {
    editorRef,
  };
};

export default useEditor;
