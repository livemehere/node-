## setTimeout, setInterval

![](https://miro.medium.com/max/1400/1*iHhUyO4DliDwa6x_cO5E3A.gif)

- 사진에서는 webAPI로 표기되어있습니다.

이번주제의 핵심은 비동기처리입니다.

node는 single 쓰레드로 동작하기 때문에, 병렬적인 처리를 하기 위해서는 node API를 사용해야하는데요, window의 경우에는 webAPI 이구요

둘다 같은 V8엔진을 사용하기 때문에, 브라우저에서 돌아가느냐, OS위에서 돌아가느냐의 차이때문에 API가 조금씩 다를 뿐 거의 동일합니다.
그중에 중요한 개념중 하나인 setTimeout, setInterval을 알아봅시다.

두가지는 call Stack에서 호출되는 순간 두번째 인자인 조건을 달성하면,
task Queue로 첫번째 인자로 callback 함수를 전달하고, 두번째인자로는 ms 를 전달합니다.

ms란 밀리세컨드로, 각각 몇초뒤에 실행할건지, 몇초간격으로 실행할건지를 지정합니다.
아래 예시를 보시죠

```js
let num = 1;

// timer 생성 ,제거
const interval = setInterval(() => {
  console.log(num++);
}, 1000);

setTimeout(() => {
  clearInterval(interval);
}, 6000);
```

정확한 동작은 생략하겠습니다.

원리 위주로 설명을하자면, setTimeout()은 node의 API로서, 비동기적으로 처리가 됩니다.

비동기적으로 처리된다는 것은, 그냥 js코드들은 위에서 아래로, 왼쪽에서 오른쪽의 순서로 코드를 읽어나가며 callstack에 쌓습니다.

하지만 비동기적으로 작동하는 함수들은 callstack에 쌓이지 않고, Callback Queue에 들어가게 됩니다.

그리고선, callstack이 완전히 비어있게 되면, 쌓여있던 callback 함수들이 callstack으로 가게되죠

> 모든 비동기 동작들이 실제로 병렬적으로 실행되는것이 아니라, 빠르게 context를 변경하면서 이루어지는 원리와 비슷합니다.

---

여기서 `setInterval()`은 무한대로 callback Queue에 callback함수를 전달합니다.

그러면 어떤 순간에는 종료를 해주고 싶다면 clearInterval()를 사용합니다.

그러기 위해선 setInterval이 반환하는 `NodeJS.Timer`를 변수에 담아두고 관리해야합니다.

> setTimeout() 도 마찬가지입니다.

---

## setImmediate(), process.nextTick()

setTimeout과 동일한 역할을 하는 두가지의 메서드입니다.

하지만, 우선순위가 다른데요. 주석처리해놓은 것이 겨로가값입니다. 참고하시면 될거같습니다.

```js
console.log("code1");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
console.log("code2");
setImmediate(() => {
  console.log("setTimeout");
}, 0);
console.log("code3");

process.nextTick(() => {
  console.log("nextTick");
}, 0);

/*
code1
code2
code3
nextTick
setTimeout
setTimeout
*/
```

## setTimeout()에서의 0초를 넣으면 ?

아래의 결과와 같이 0초를 넣으면 바로실행되는 것이아니라, 2.272ms 시간 뒤에 실행됩니다.

바로 실행시간이 0초가 나오지 않는 이유는, 위에서 설명했듯이 callstack -> nodeAPI -> callback Queue -> callstack 의 순서로 소요되는 시간이 있기 때문입니다.

```js
console.time("timeout 0");
setTimeout(() => {
  console.timeEnd("timeout 0");
  console.log("setTimeout");
}, 0);

// callback이 실행되기 위해선  callStack이 비어야되기때문에, 0초는 사실상 1ms 정도 걸리는것인데,그건 코드에따라다르게된다.

//1timeout 0: 2.272ms
```
