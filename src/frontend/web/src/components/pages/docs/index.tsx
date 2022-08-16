import React from "react";
import * as Y from "yjs";

function Docs() {
  const doc = new Y.Doc();
  const yarray = doc.getArray("my-array");
  yarray.observe((event) => {
    console.log("yarray was modified");
    console.log("event", event);
  });
  // every time a local or remote client modifies yarray, the observer is called
  yarray.insert(0, ["val"]); // => "yarray was modified"
  return (
    <div className="App">
      <header className="App-header">
        <p>docs</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yjssss
        </a>
      </header>
    </div>
  );
}

export default Docs;
