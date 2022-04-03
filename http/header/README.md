## Stateless Protocol

http통신에서 요청은 상태를 가지고 있지 않습니다.

즉, 요청에대한 순서가 상관이없고, 서로 관련도 없어야 합니다.

> 그럼 이런 상태가 없는 요청을 통해서, 어떻게 로그인과같은 상태를 알수있을까요?

## Cookies & Sessions

![](https://www.freecodecamp.org/news/content/images/2021/02/fireship-cookies.png)

로그인을 할때, 성공적으로 반환한다면, 서버에서는 header에 검증된 사용자를 식별할 수 있는 token을 response에 담아서 반환합니다.

(브라우저의경우) 응답을 받으면 header에 들어있는 cookie에 저장할 정보를 자동으로 브라우저의 cookie에 저장합니다.

이후에는, 클라이언트가 요청할때마다 cookie에있는 token을 request의 header에 담아서 요청합니다.

그러면, 서버에서 검증한 token이기때문에, 로그인을 했음을 알수있습니다.

> 이렇게 cookie와 header를 이용해서 request자체에는 상태가 없지만, 다양한 정보들을 포함한 요청을 할 수있습니다.

### cache control

최초의 로그인을 통해서 받은 token은 쿠키에 저장되고, 쿠키는 cache를 지원하기때문에, 한번 로그인했다면

브라우저에 저장되어있는 token을 header에 담아서 요청에 사용합니다.

### User-Agent

서버에서 요청하는 클라이언트가 누군지 알고싶을떄 사용하는 header 요소 중 하나

브라우저, 운영체제 등에 대한 정보가 들어있습니다.

## Header의 구성

header는 표준화가 된 header의 내용인 standard 부분과 Custom한 부분이 있습니다.

표준이 아닌 우리가 개인적으로 설정하는 Header내용들은 보통

domain-key or domain.key 이런식으로 명명을 합니다.

> auth의 경우 Standard에 Authorization을 사용합니다.

### 표준에 따라야하는 이유

왜 header에는 표준화된 부분이 존재할까요?

바로 브라우저가 그 표준에 맞춰서 동작하도록 만들어져 있기 때문입니다.

예를들어서 권한에대한 정보를 header에 담기위해서, 커스텀하게 막 작성해도 상관은없지만

[image는 블로그 포스팅에 있습니다]

위와 같은 규격을 지키는 것이 중요합니다.

### 여러가지 표준화된 header fields

[image는 블로그 포스팅에 있습니다]

- 컨텐츠의 사이즈
- 컨텐츠의 타입
- 언어 정보

[image는 블로그 포스팅에 있습니다]

- 이 데이터를 얼마동안 캐시할 것인지(자주 변경되는 정보가 안라면 오래  캐싱을 하도록 설정합니다)
