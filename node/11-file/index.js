const fs = require("fs");

// 동기
fs.renameSync("./test.txt", "./kong-text.txt");

// 비동기 callback
fs.rename("./kong-text.txt", "./ha.txt", (err) => {
  if (err) console.error(err);
});

// 비동기 promises
fs.promises.rename("./ha.txt", "./king.txt").then(console.log).catch(console.log);
