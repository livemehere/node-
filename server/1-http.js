const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    fs.createReadStream("./html/index.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080);
