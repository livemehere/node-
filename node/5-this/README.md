## this

node환경에서와 Browser환경에서의 this 는 다릅니다.

그리고 본래 this는 실행환경(context)에 따라서 참조하는값이 바뀌는데요

우선은 node와 브라우저의 차이에 대해 살펴봅시다

## Global 에서의 this

단순히 global 환경에서 this를 출력하면 module.exports 를 가르키고 있습니다.

```js
console.log(this) // {}
console.log(this === module.exports) //true
```

## 함수내에서의 this

함수 내에서 호출하는 this 는 어떻게 될까요?

바로, global과 같습니다.

```js
function f1(){
    console.log(this) //global
    console.log(this === global) //true
}

f1();

```

앞전 글에서 우리가 기본적으로 작성하게 되는 환경은 최상위 객체의 내부 global이라고 했었습니다.

그럼 당연하게도 함수나,변수를 작성하는 것은 global객체의 메서드, 멤버변수가 되는 것인데요

this는 바로 자기자신이 호출된 context를 가리키기 때문에, 함수 내에서는 global이 되는 것입니다.

> 그래서 일반적으로 function 키워드로 만든 함수는 새로운 this를 정의한다. 라고 합니다. ()=>{} arrow function 의 경우에는 새로운 context를 만들지않고, 외부의 this를 가져다 사용합니다.