import "quill/dist/quill.bubble.css";
import { useRef } from "react";
import useEditor from "./hooks/use-editor";

const Memo = () => {
  const { editorRef } = useEditor();
  const imageRef = useRef<HTMLImageElement>(null);
  fetch("/images/1")
    .then((response) => {
      return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
      if (imageRef.current) {
        imageRef.current.src = URL.createObjectURL(new Blob([arrayBuffer]));
      }
    });

  return (
    <div>
      <div ref={editorRef} />
      <img ref={imageRef} />
    </div>
  );
};

export default Memo;
