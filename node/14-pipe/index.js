const fs = require("fs");

const writeStream = fs.createWriteStream("./write.txt");

writeStream.on("finish", () => {
  console.log("end() 기 호출되면 finish 이벤트가 발생합니다");
});

writeStream.write("kong!");
writeStream.write("kongha");
writeStream.write("hello!");

writeStream.end();
