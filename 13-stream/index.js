const fs = require("fs");

const data = [];

fs.createReadStream("./file.txt", "utf8")
  .on("data", (chunk) => {
    // 데이터를 읽을 떄 발생하는 이벤트(chunk가 파일을 다읽을떄까지 전달)
    data.push(chunk);
  })
  .on("end", () => {
    console.log(data);
  });
