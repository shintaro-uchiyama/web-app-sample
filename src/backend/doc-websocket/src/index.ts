import http from "http";
import { WebSocketServer } from "ws";
import { setupWSConnection, setPersistence } from "y-websocket/bin/utils";
import * as Y from "yjs";
import { LeveldbPersistence } from "y-leveldb";
import { TextDecoder } from "util";

const wss = new WebSocketServer({
  noServer: true,
});

const host: string = "0.0.0.0";
const port: number = 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

setPersistence({
  provider: null,
  bindState: async (docName, ydoc) => {
    const ldb = new LeveldbPersistence("./dbDir");
    const persistedYdoc = await ldb.getYDoc(docName);
    const newUpdates = Y.encodeStateAsUpdate(ydoc);
    console.log("bind state");
    Y.logUpdate(newUpdates);
    ldb.storeUpdate(docName, newUpdates);
    Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc));
    ydoc.on("update", (update: Uint8Array, origin: any, doc: Y.Doc) => {
      console.log("update");
      Y.logUpdate(update);
      ldb.storeUpdate(docName, update);
    });
  },
  writeState: async (docName, ydoc) => {
    console.log("writeState");
    console.log(docName);
    console.log(ydoc.toJSON());
  },
});
wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  const handleAuth = (ws: any) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`);
});
