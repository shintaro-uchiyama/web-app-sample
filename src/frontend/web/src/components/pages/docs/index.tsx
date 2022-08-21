import React from "react";
import * as Y from "yjs";
import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
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
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: "Cyndi Lauper",
          color: "#f783ac",
        },
      }),
    ],
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>docs</p>
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            width: "800px",
            height: "400px",
          }}
        >
          <EditorContent editor={editor} />
        </div>
      </header>
    </div>
  );
}

export default Docs;
