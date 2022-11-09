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

    quill.on(
      "selection-change",
      (_delta: any, _oldContents: any, source: Sources) => {
        console.log("source: ", source);

        const selection = quill.getSelection();
        console.log("selection: ", selection);
        if (!selection) return;

        const text = quill.getText();
        const focusedMatch = [...text.matchAll(/[a-zA-Z][1-9]/g)].find(
          (match) => {
            if (!match.index) return;
            return (
              match.index <= selection.index &&
              selection.index <= match.index + match[0].length
            );
          }
        );

        if (focusedMatch) {
          console.log("focusedMatchFound: ", focusedMatch);
        }
      }
    );
  }, [editorRef]);

  return {
    editorRef,
  };
};

export default useEditor;
