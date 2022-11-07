import "quill/dist/quill.bubble.css";
import useEditor from "./hooks/use-editor";

const Memo = () => {
  const { editorRef } = useEditor();
  return <div ref={editorRef} />;
};

export default Memo;
