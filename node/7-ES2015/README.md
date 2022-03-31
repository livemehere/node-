## ES2015 모듈 시스템

기존의 commonJS 모듈 시스템은 약간은 문법적으로 복잡하죠?

하지만 그렇다고 구식이라는것은 아닙니다. 거듭할수록 새로운 문법과 모듈 라이브러리들은 계속 나오니까요!

비교적 가독성도 좋은 (사실 기능도 더 좋긴합니다import 구문을 최상단에 하지 않아도 동작함) ES2015의 새로운 모듈 시스템을 살펴봅시다!

## npm init

이 모듈 시스템을 사용하려면 npm init을 해주어야합니다.

```bash
npm init -y
```

그리고 package.json 파일에서 "type":"module" 을 추가해줍시다 (default :  commonJS)

```json
{
  "name": "7-es2015",
  "version": "1.0.0",
  "description": "",
  "main": "a.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

## 코드 수정하기

### a.js

```js
import {count,getCount,increase} from './b.js';

console.log(count)
increase();
console.log(getCount())
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


export {count, getCount, increase}
```

간단해졌죠?

commonJS 나 ES2015 모듈이나 모두 저처럼 마지막 구문에 객채형식으로 전달해줄수도있고,

함수나,변수마다 앞에 선언할 시점에 export 구문을 넣어서 바로바로 전달 하는 방법도있습니다

자세한 문법은 제가 적는것 보다 공식 문서를 보는게 더 좋을것 같습니다!

## 참고


### a.js

이렇게 해도 동작합니다 _^;;

```js

console.log(count)
increase();
console.log(getCount())

import {count,getCount,increase} from './b.js';

```
