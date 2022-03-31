## npm 이란?

Node Package Manager 입니다.

혹은 node library manager라고도 하지요

- npm : 설치
- npx : 실행

> yarn 은 npm 과 호환이되고, 성능,보안적으로 개선된 툴입니다.

- package.json : meta data
- scripts : npm 명령어 script 지정

> npm 을 실행해보면, 어떤 명령여를 사용할수있는지 나오고, custom한 명령어는 'npm run 명령어' 로 실행가능하다.

## 라이센스

![ISC라이센스란?](https://www.olis.or.kr/license/Detailselect.do?lType=spdx&lId=1074)

## 버전정보

1.0.0 (Major . Minor . Patch)

- patch : 사소한 오류
- minor : 작은 기능(기능추가)
- Major : 기능변경, 큰 API의 변화

### 표기법

~ : patch 자유
^ : patch, minor 자유

![버전 테스트 사이트](https://semver.npmjs.com/)

## install

- npm 5 버전이상에서는 --save 옵션을 넣어주지 않아도된다.
- install = i = add 로 축약가능
- -g (-global) 글로벌 설치

> npm view 패키지명 을 하면 해당 패키지의 정보가 나온다

## 명령어

- npm outdated : 업데이트가 필요한 패키지를 ㅇ라려준다.
