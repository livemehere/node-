## event 만들기

js코딩을 하다보면 `addEventListner('click',callback)` 이런형태의 이벤트기반의 callback동작을 많이 보죠?

또 socket통신을 하다보면 `socket.on('...')` 이런형태도 있구요

만들어져있는것만 사용할수있을까요?

바로 커스텀 이벤트를 만들어봅시다!

## EventEmitter 객체

이벤트는 흔이 emit, on 이 두가지로 이루어져있습니다.

emit은 방출하다라는 뜻이고, on 은 그방출한것을 받는 역할을 한다고 추상적으로 이해하시면 될거같습니다.

그럼 하나는 방출하는것이고, 하나는 받는역할,즉 대기하는 역할을 하죠(listening)

아래의 예시 코드를 먼저 봅시다.

```js
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
```

## eventName

emit과 on 의 첫번째 인자로는 이벤트의 이름을 생성해줍니다.

둘이 소통하는 통로의 역할을 합니다. 같은 이벤트이름끼리 주고, 받고를 할수있죠

```js
on(eventName: string | symbol, listener: (...args: any[]) => void): this;
emit(eventName: string | symbol, ...args: any[]): boolean;
```

둘의 정의 부분입니다.

첫번째인자로 eventName을 string으로 받고있죠!

on()은 두번째인자로 callback함수를

emit()은 두번째인자로 아무거나 배열로 받습니다

이런 규칙을 이용해서 커스텀한 클래스로 만들면 좋겠군요!

## 예시

### logger.js

```js
const EventEmitter = require("events");

const loggerEmitter = new EventEmitter();

function log(callback) {
  loggerEmitter.emit("log", "log start ...");
  callback();
  loggerEmitter.emit("log", "log end ...");
}

module.exports = { loggerEmitter, log };
```

### app.js

```js
const { log, loggerEmitter } = require("./logger.js");

loggerEmitter.on("log", (str) => {
  console.log(str);
});

log(() => {
  console.log(1);
});
```

위 코드는 log()라는 함수를 호출하면 그함수는 'log'이벤트를 발생시키고, callback을 수행합니다.

그러면 사용하는입장에서 'log'이벤트를 listening하도록 작성해주고, log함수를 사용하면 되겠죠!!

뭔가 지저분하죠?.. js에서는 module시스템 자체가 객체이기 때문에, 이렇게해도 무방하지만 class로 깔끔하게 고쳐보겠습니다.

---

## class 형식으로 다시 작성

### logger.js

```js
const EventEmitter = require("events");

class kongLogger extends EventEmitter {
  log(callback) {
    this.emit("log", "log start...");
    callback();
    this.emit("log", "log end...");
  }
}

module.exports.log = new kongLogger();
```

### app.js

```js
const { log } = require("./logger.js");

log.on("log", () => {
  console.log("더깔끔해진 log!!");
});

log.log(() => {
  console.log("log 호출!");
});
```
