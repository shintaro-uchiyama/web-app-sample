import http from "http";

const host: string = "localhost";
const port: number = 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`);
});

console.log("Hello world!!!");
