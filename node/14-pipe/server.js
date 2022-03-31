const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const file = fs.readFileSync("./file.txt");
  res.end(file);

  //   const stream = fs.createReadStream("./file.txt");
  //   stream.pipe(res);
});

server.listen(5252);
