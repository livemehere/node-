## HTTP 란?

### Hypertext Transfer Protocol 의 약자입니다.

전송하는 규약인데 어떤것을 전송하느냐? 하이퍼 텍스트 입니다.

하이퍼텍스트라는것은 링크가 들어있는 텍스트를 말합니다.

지금이야 동영상, 사진, 오디오 등 다양한 미디어들이 함께 전달되고있지만

초창기에는 단순히 텍스트와 링크뿐이었습니다.

그래서 Hypermedia Transfer Protocol 이라고 생각해도 맞지 않을까 생각합니다.

## Request, Response

http는 요청에대한 응답을 반환합니다.

## https

### http + Secure

클라이언트와 서버간의 데이터 통신을 암호화 하여 안전한 방식으로 하는 것입니다.

> 서로 보안관계가 형성된 클라이언트와 서버끼리 데이터를 안전하게 전달하고 전달받고, 제 3자는 보안관계가 형성되어있지 않기 때문에 그 데이터를 볼수 없습니다.

> 실제로 https를 적용하기 위해서는 특정 도메인을 지정해주어야합니다.

## HTTP v1, HTTP v2, HTTP v3

> v1 -> v2 로 변경된 사항은 기술적인 측면도있고, 다양합니다.  
> 그중에 알아야 할 개념은, http2는 반드시 https만 지원한다는 점입니다.  
> 2019년도부터 v3를 개발중인데, v2와 큰 차이점은 없다고 하는데, 많은 브라우저가 지원하진 않고 있습니다.

### HTTP v1

- 통신되는 데이터가 텍스트 기반입니다.
- header의 데이터도 압축되지 않은 형태로 그대로 노출
- 한번의 하나의 파일만 전송가능

### HTTP v2

- binary 형태로 전송됨
- header 부분도 압축
- 여러개의 파일을 동시에 주고받을 수 있음 (multiplexing)
- 이외 보안과 성능이 개선

### HTTP v3

- TCP 프로토콜에서 UDP프로토콜을 base로 개발 중

## 정리

클라이언트와 서버가 통신을 할때는

- TCP 커넥션을 합니다.
- 클라이언트는 이제 request를 할 수 있게됩니다.
- 클라이언트는 어떤 정보를 원하는지 method, url, header, resource 를 함꼐 요청합니다.
- 서버는 status코드와 함께 response를 전달합니다.
- 통신할 것이 더이상없다면 TCP 연결을 종료합니다.
