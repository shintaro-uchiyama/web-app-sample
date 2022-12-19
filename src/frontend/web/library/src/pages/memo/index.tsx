import { css } from "@emotion/react";
import "quill/dist/quill.bubble.css";
import useEditor from "./hooks/use-editor";

const Memo = () => {
  const { editorRef } = useEditor();

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "95%",
        height: "600px",
        margin: "0 auto",
      }}
      css={css`
        height: 600px;
      `}
      ref={editorRef}
    />
  );
};

export default Memo;
