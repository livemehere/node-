const EventEmitter = require("events");

const emitter = new EventEmitter();
const callback1 = (args) => {
  console.log("callback1--", args);
};

emitter.on("kong", callback1);

emitter.on("ha", (args) => {
  console.log("ha--", args);
});

emitter.emit("kong", "hhhh");
emitter.emit("kong", "hhhh");
emitter.removeListener("kong", callback1); //이벤트 제거
emitter.emit("kong", "hhhh");
emitter.emit("kong", "hhhh");
