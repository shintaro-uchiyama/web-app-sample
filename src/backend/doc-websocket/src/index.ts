import http from "http";
import { WebSocketServer } from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";

const wss = new WebSocketServer({
  noServer: true,
});

const host: string = "0.0.0.0";
const port: number = 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
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
