## Request의 구성

### URL ?

Uniform Resource Locator 의 약자입니다.

리소스가 어디에 있는지, 고유한 값을 나타냅니다.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCM_oOgSBO3FyS_fuNhi_gfYUd7yv55gR3g&usqp=CAU)

그림과 같이 해석할 수 있습니다.

## 일반적인 status코드 응답방식

### GET

- 200 : 데이터를 반환할때
- 401 : 권한이 없을때
- 403 : 특정한 권한이 없을때(admin)
- 404 : 요청을 잘못 했을때
- 405 : 해당 method를 지원하지 않을때

### POST

- 201 : created 생성
- 401 : 권한이 없을때
- 403 : 특정한 권한이 없을때(admin)
- 404 : 요청을 잘못 했을때
- 409 : conflict, 만들고자 하는 리소스가 이미 있어서 충돌이 날때

### PUI, DELETE, PATCH

- 200 : OK
- 204 : 성공적인 삭제를 알림
- 403 : 특정한 권한이 없을때(admin)
- 404 : 요청을 잘못 했을때
- 405 : 해당 method를 지원하지 않을때

## 서버의 데이터를 읽기만 하는 Method

- GET
- HEAD
- OPTIONS
- TRACE

사용자가 얼마나 많은 요청을해도 서버의 데이터는 변경되지 않습니다.

## 서버의 데이터를 변경하는 Method

- POST
- PUT
- DELETE
- PATCH

## 그밖의 좋은 관습

### GET

- body는 비어있어야 한다(특정 URL을 지정해서 데이터를 받기때문)
- response에는 body로 데이터를 채워주어야한다.
- safe하다.(서버의 데이터를 변경하지 않고, 읽기만 하기때문)
- **Idempotent(멱등하다) yes**

> 동일한 요청을 수많이,빠르게 해도 그 수에 상관없이 항상 서버를 동일한 상태로 유지할 수 있고, 그 요청들이 같은 효과를 지닐때 멱등성을 가졌다고 합니다.

- cache가 가능

### HEAD

- safe
- Idempotent yes

### POST

- not safe
- Idempotent X
- cache는 부분적으로 가능

### PUT

- not safe
- Idempotent yes
- cache 불가능

> 요청을 아무리 많이해도 동일한 내용으로 업데이트 되기 때문에 Idempotent하지만, 서버의 데이터를 변경하기 때문에 safe하지는 않다.

### PATCH

- not safe
- Idempotent X

> 부분적으로 업데이트하기 때문에 Idempotent하지 않다.
