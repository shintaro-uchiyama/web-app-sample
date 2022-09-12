import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { bodyTextColor, menuBackgroundColor } from "~/styles/colors";

const App = () => {
  const content = [...Array(15)].reduce(
    (prev, current) => `${prev}<p></p>`,
    ""
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-96",
      },
    },
    content,
  });

  return (
    <div
      className={`rounded h-96 max-w-4xl mx-auto ${menuBackgroundColor} ${bodyTextColor}`}
    >
      <EditorContent editor={editor} />
    </div>
  );
};

export default App;
