# Global 객체

```js
console.log(global)
```

```bash
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 54.64459204673767,
      nodeStart: 2.7806049585342407,
      v8Start: 3.6676820516586304,
      bootstrapComplete: 40.02111005783081,
      environment: 18.805647015571594,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1647799192613.373
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}

```

## Global 객체에 추가하기

```js
hello ='kong';

console.log(global.hello)
```

```bash
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 71.4465399980545,
      nodeStart: 6.144389033317566,
      v8Start: 7.530765056610107,
      bootstrapComplete: 61.38393199443817,
      environment: 30.390879034996033,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1647799389442.7
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  hello: 'kong' # 여기 추가된 모습
}

```

[공식문서 Global 객체 목록](https://nodejs.org/docs/latest-v15.x/api/globals.html)