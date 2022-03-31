console.time("timeout 0");
setTimeout(() => {
  console.timeEnd("timeout 0");
  console.log("setTimeout");
}, 0);

// callback이 실행되기 위해선  callStack이 비어야되기때문에, 0초는 사실상 1ms 정도 걸리는것인데,그건 코드에따라다르게된다.

//1timeout 0: 2.272ms
