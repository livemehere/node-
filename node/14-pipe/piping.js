const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./file.txt");
const writeStream = fs.createWriteStream("./new2.zip");
const zlibStream = zlib.createGzip();

// pipe 연결
readStream
  .pipe(zlibStream)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("복사완료!");
  });
