import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { bodyTextColor, menuBackgroundColor } from "~/styles/colors";
import "./styles.scss";

const App = () => {
  const yDoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "ws://docker-vm.local:1234",
    "sample",
    yDoc
  );
  // useEditor causes `Cannot read property 'matchesNode' of null` error
  // So we use Editor class
  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: provider.doc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: getRandomName(),
          color: getRandomColor(),
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-96",
      },
    },
  });

  return (
    <div
      className={`rounded h-96 max-w-4xl mx-auto ${menuBackgroundColor} ${bodyTextColor}`}
    >
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};

const getRandomName = (): string => {
  const now = new Date();

  return `Guest User ${now.getFullYear()}-${now
    .getMonth()
    .toString()
    .padStart(2, "0")}-${now
    .getDay()
    .toString()
    .padStart(
      2,
      "0"
    )} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
};

const getRandomColor = (): string =>
  "#" + Math.floor(Math.random() * 0xffffff).toString(16);

export default App;
