const { log } = require("./logger.js");

log.on("log", () => {
  console.log("더깔끔해진 log!!");
});

log.log(() => {
  console.log("log 호출!");
});
