const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    ejs
      .renderFile("./templates/index.ejs", { username: "kong", dataList: ["html", "css", "js", "node"] })
      .then((data) => {
        res.write(data);
        res.end();
      });
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080);
