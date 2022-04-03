const http = require("http");

const courses = [
  { id: 1, title: "html" },
  { id: 2, title: "css" },
  { id: 3, title: "js" },
  { id: 4, title: "node" },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(courses));
    } else if (method === "POST") {
      const buffers = [];
      req.on("data", (chunk) => {
        buffers.push(chunk);
      });
      req.on("end", () => {
        const data = Buffer.concat(buffers);
        const json = JSON.parse(data);
        console.log(json);
        courses.push(json);
        res.statusCode = 201;
        res.end("done");
      });
    }
  }
});

server.listen(8080);
