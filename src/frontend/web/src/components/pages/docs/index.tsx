import React from "react";
import * as Y from "yjs";
import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import { HocuspocusProvider } from "@hocuspocus/provider";

function Docs() {
  // Set up the Hocuspocus WebSocket provider
  const provider = new HocuspocusProvider({
    url: "ws://docker-vm.local:1234",
    name: "example-document",
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: provider.document,
      }),
    ],
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>docs</p>
        <EditorContent editor={editor} />
      </header>
    </div>
  );
}

export default Docs;
