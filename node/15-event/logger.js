const EventEmitter = require("events");

class kongLogger extends EventEmitter {
  log(callback) {
    this.emit("log", "log start...");
    callback();
    this.emit("log", "log end...");
  }
}

module.exports.log = new kongLogger();
