## node 의 module system

개발을 할때, 한파일에 다 작성하지 않죠?

일반적으로는 비슷한 기능별로 다른 파일로 관리를 합니다. 이를 모듈화 라고하는데요

node환경에서는 모듈을 어떻게 지원하고 있을까요?

## commonJS 모듈

node 환경에서는 'commonJS' 모듈방식을 지원하고 있습니다.

예시를 통해서 알아보겠습니다

### a.js

```js
console.log(count) // ReferenceError: count is not defined
console.log(getCount()) // ReferenceError: getCount() is not defined
```

### b.js

```js
let count =0;

function getCount(){
    return count;
}

function increase(){
    count++;
}
```

현재 상황은 a.js 라는 파일과 b.js 라는 파일을 작성하여

b.js에 있는 count라는 변수와, getCount()함수를 a.js 파일에서 접근하려고 하고있습니다.

하지만 찾을수 없다고 undefined가 뜨고있네요

단순히 파일을 별도로 작성하게된다면 서로다른 파일들 간에는 접근할 방법이 없습니다.

그렇다면 b.js의 자원들을 밖으로 노출시켜야 합니다.

## module.exports, exports

각 파일의 자원들을 외부로 노출시키는 키워드는 두 개가 있습니다.

module.exports 와 exports 인데요

둘다 같은 객체를 가르키고 있습니다.

b.js 파일을 아래와 같이 수정해줍니다

```js
let count =0;


function getCount(){
    return count;
}

function increase(){
    count++;
}


module.exports.count = count;
module.exports.getCount = getCount;
module.exports.increase = increase;

```

그리고 a.js 파일도 수정해주세요

```js
const {count,getCount} = require('./b.js');

console.log(count) // 0
increase();
console.log(getCount()) // 1


```

이제 에러가 없이 잘 참조가 되고있습니다!

increase() 함수도 잘 동작하고 있네요!

자그럼 어떤 구조인 지 자세히 살펴봅시다.

아래 코드를 작성해보고 결과를 봅시다!

### a.js

```js
console.log(this) // {}
console.log(module.exports) // {}
console.log(exports) // {}

console.log(this === module.exports) // true
console.log(module.exports === exports) // true
console.log(this === exports) // true


console.log(module)

/**
 * Module {
 *   id: '.',
 *   path: '/.../6-module',
 *   exports: {},
 *   filename: '.../6-module/a.js',
 *   loaded: false,
 *   children: [
 *     Module {
 *       id: '.../6-module/b.js',
 *       path: '.../6-module',
 *       exports: [Object],
 *       filename: '.../6-module/b.js',
 *       loaded: true,
 *       children: [],
 *       paths: [Array]
 *     }
 *   ],
 *   paths: [
 *     '.../6-module/node_modules',
 *     '.../node_modules',
 *     '.../Documents/node_modules',
 *     '.../node_modules',
 *     '/Users/node_modules',
 *     '/node_modules'
 *   ]
 * }
 *
 */
```

지금 this, module.exports, exports 는 모두 {} 텅빈 객체를 가르키고 있죠?

보는 그대로가 맞습니다!

그리고 module 을 출력해보면 이 파일자체를 하나의 모듈로서 보고있고,

프로퍼티 중에서 exports:{} 가 보입니다.

즉, node 환경에서는 js파일을 작성하게 되면 고유의 Module로서 동작하고

module객체에 exports라는 프로퍼티가 외부로 노출되는 원리입니다.

그래서 정확하게 말하자면 module.exports 가 본래의 객체이고

exports 는 module.exports를 참조하고 있기 때문에 같다고 판별되는 것입니다.

똑같이 동작하는게 맞나 확인해봅시다

### b.js

```js
let count =0;


function getCount(){
    return count;
}

function increase(){
    count++;
}



this.count = count;
this.getCount = getCount;
this.increase = increase;

exports.count = count;
exports.getCount = getCount;
exports.increase = increase;

```

b.js 파일을 다음과 같이 수정해 보아도 a.js에서는 오류없이 잘 동작하게됩니다.

## global vs module

자 그러면, 결국 node 환경에서 js 파일은 하나의 module로서 독립적으로 동작하게 되는 것입니다.

그러면 global과 this 의 차이는 무엇일까요?

```js
console.log(this === global) // false
console.log(module === global) // false
```

결과는 다르게 나옵니다.

앞전 글에서 global에 대해서 설명했을 때 

```js
count = 0
```

이렇게 작성하면 이 변수는 어떻게 접근할 수 있었냐요?

```js
console.log(global.count) // 0
```

이렇게 global의 프로퍼티로 들어가게 되었습니다.

module의 경우에는 외부로 노출시키고 싶은 값을 module.exports 에 담아주었죠

> Browser환경에서 js 가 돌아갈때는, script들이 연속되어있고, type=module을 지정하지 않는한 모두 같은 context에 존재해서
> window(=global)객체에서 값과, 함수들이 공유됩니다. require()같은 것들을 하지 않아도 되는 이유. 예를 들면 jQuery 같은 것들은
> 최상위에 선언하면 모든 script파일에서 참조할 수 있죠!


## 주의 사항

```js
module.exports = {}

console.log(this  === module.exports) // false
```

우리는 이때까지 module.exports에 프로퍼티를 추가해준것이지 새로운 객체를 담진 않았습니다.

만약 위 코드와 같이 새로운 Object를 대입하게 된다면 모든 참조관계가 끊어집니다.