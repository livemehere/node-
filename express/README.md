## express 살펴보기

## Request

```js
import express from "express";

const app = express();

app.get("/:id/:user", (req, res, next) => {
  console.log(req.headers);
  console.log(req.path);
  console.log(req.params);
  console.log(req.query);
  res.send("done");
});

app.listen(8080);
```

## 응답에서 header 설정하기

```js
app.get("/:id/:user", (req, res, next) => {
  res.setHeader("name2", "ha!");
  res.send("done");
});
```

## app.use() vs app.all()

둘은 비슷하면서도 다르게동작합니다.

`/api`라는 경로에 대해서 동작을하는데

`all`같은경우 exact하게 동작합니다. 즉, 딱` /api`만 동작하고

`use`같은 경우 `/api/anything` 이런식으로해도 동작합니다.

```js
app.all("/api", (req, res, next) => {
  console.log("all");
  next();
});

app.use("/api", (req, res, next) => {
  console.log("use");
  next();
});
```

### app.all() 을 app.use()처럼 동작하게 하고싶다면

에스터리스크를 명시해주면 됩니다.

```js
app.all("/api/*", (req, res, next) => {
  console.log("all");
  next();
});
```

## POST 의 body 읽기

> json 데이터에 한정

```js
app.use(express.json());

app.post("/", (req, res, next) => {
  console.log(req.body);
  res.send("done");
});
```

## 에러처리하기

express 의 미들웨어에서 에러가 발생한다면, 최하단에 배치해둔 error 파라미터를 포함한 미들웨어로 던져지게 됩니다.

그래서 최하단에 에러를 받을수 있는 미들웨어를 등록해두면 서버가 절대 꺼지지않죠

하지만 비동기작업을 했을때 문제가 발생합니다.

callback, promise, async 를 사용한 비동기동작에서 에러가 발생하면, 그에러는 미들웨어를 실행하는 도중에 발생하는 것이 아니라

내부적으로 발생하는 에러이기 때문에, 미들웨어 컨텍스트에서 에러를 잡아낼 수 없습니다.

즉, 마지막의 error를 잡아내는 미들웨어까지 다 지나간 후에야, callstack에 다시 들어와 발생하는 에러이기 때문에 서버가 멈춰버리게 되죠

이를 해결하기 위해서는 반드시 비동기작업에서 각각에 맞는 에러를 핸들링해주어야합니다.

직접 에러핸들링을 하거나, next()함수를 통해서 error를 잡아내는 마지막 미들웨어로 던지거나 선택하시면 됩니다.

```js
import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

// 동기작업 에러 처리
app.get("/file1", (req, res, next) => {
  try {
    const data = fs.readFileSync("./file1.txt");
  } catch (e) {
    res.status(404).send("file not found");
  }
});

// 비동기작업 에러 처리 (callback)
app.get("/file2", (req, res, next) => {
  // callback형태의 비동기작업은 err가 callback으로 넘어가기 때문에, 외부에서 에러가 던져지지 않는다. callback 내에서 처리해 주어야한다.
  fs.readFile("./file2.txt", (err) => {
    if (err) {
      res.status(404).send("file2 not found!");
    }
  });
});

// 비동기작업 에러 처리 (promise)
app.get("/file3", (req, res, next) => {
  fs.promises
    .readFile("./file3")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      console.log("promise err");
      res.status(404).send("prmise err");
    });
});

// 비동기작업 에러 처리 (promise to next)
app.get("/file4", (req, res, next) => {
  fs.promises.readFile("./file4").catch((e) => next(e));
});

// 비동기작업 에러 처리 (async)
app.get("/file5", async (req, res, next) => {
  try {
    const data = await fs.promises.readFile("./file5");
  } catch (e) {
    console.log("async error");
  }
});

// 미들웨어에서 에러가 발생하면 모두 여기로 넘어온다.(미들웨어 내에서 에러처리를 하지 않을때)
app.use((error, req, res, next) => {
  console.log("error");
  res.send({ message: "만능 error 발생!" });
});

app.listen(8080);
```

## 비동기 작업도 자동으로 error 미들웨어로 던지려면?

> import "express-async-errors" 이 라이브러리를 받고,import 만해주면 Promise를 반환하는 미들웨어의 에러를 error 미들웨어로 넘깁니다. async 함수로 작성된것은 그냥두면 되지만 promise 로 작성된 비동기작업은 반드시 그 promise를 return 해주어야합니다.

> callback은 처리안해줘도 잡아지는 거같음.

```js
import express from "express";
import fs from "fs";
import "express-async-errors";

const app = express();

app.use(express.json());

// 동기작업 에러 처리
app.get("/file1", (req, res, next) => {
  const data = fs.readFileSync("./file1.txt");
});

// 비동기작업 에러 처리 (callback)
app.get("/file2", (req, res, next) => {
  // callback형태의 비동기작업은 err가 callback으로 넘어가기 때문에, 외부에서 에러가 던져지지 않는다. callback 내에서 처리해 주어야한다.
  fs.readFile("./file2.txt");
});

// 비동기작업 에러 처리 (promise)
app.get("/file3", (req, res, next) => {
  return fs.promises.readFile("./file3").then((data) => {
    res.status(200).send(data);
  });
});

// 비동기작업 에러 처리 (promise to next)
app.get("/file4", (req, res, next) => {
  return fs.promises.readFile("./file4");
});

// 비동기작업 에러 처리 (async)
app.get("/file5", async (req, res, next) => {
  const data = await fs.promises.readFile("./file5");
});

// 미들웨어에서 에러가 발생하면 모두 여기로 넘어온다.(미들웨어 내에서 에러처리를 하지 않을때)
app.use((error, req, res, next) => {
  console.log("error");
  res.send({ message: "만능 error 발생!" });
});

app.listen(8080);
```

## route로 chaining 하기

```js
app
  .route("/post")
  .get((req, res) => {
    res.send("GET /post");
  })
  .post((req, res) => {
    res.send("POST /post");
  })
  .delete((req, res) => {
    res.send("DELETE /post");
  });
```

## Router 로 모듈화

### app.js

```js
import express from "express";
import postRouter from "./router/post.js";

const app = express();

app.use(express.json());

app.use("/post", postRouter);

app.listen(8080);
```

### post.js

```js
import express from "express";

const router = express.Router();

router.get("/all", (req, res) => {
  res.send("GET post");
});

export default router;
```

## express.json() vs express.urlencoded() 차이

json()은 body의 값이 REST API를 통해서 JSON형식으로 전달된 것을 파싱하고

urlencoded()는 HTML에서 Form을 통해서 전송된 데이터를 파싱합니다.(반드시 extended 속성을 주어야 합니다)

```js
app.use(express.json()); // REST API -> body
app.use(express.urlencoded({ extended: false })); // HTML Form -> body
```

## CORS 문제 해결하기

서버와 클라이언트같에 http통신시 도메인이 다르다면 원칙적으로 어떠한 리소스도 받을 수 없다.

이를 해결하기 위해서는, 서버에서 데이터를 보내줄때 'Access-Control-Allow-Origin'로 특정 도메인을 허용해주어야한다.

'\*'을 해주면, 모두 허용한다.

유용한 미들웨어로 cors 미들웨어가 있다.

### server.js

```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  next();
});

app.get("/", (req, res) => {
  res.json("hi");
});
```

### index.html

> res.send()는 text형태이기 때문에 받아서 text()로 파싱하고 res.json()을 한 경우에는 json형태로 파싱해주어야한다.

```html
<h1>Client</h1>
<script>
  fetch("http://localhost:8080", { method: "GET" })
    .then((data) => data.text())
    .then((data) => console.log(data));
  // .then((data) => data.json())
  // .then((data) => console.log(data));
</script>
```

## 유용한 미들웨어

```js
app.use(cors()); //cross-origin 설정
app.use(express.json()); // REST API body 파싱
app.use(express.urlencoded({ extended: false })); // HTML Form body 파싱
app.use(express.static("public")); // 정적 리소스 제공
app.use(cookieParser()); // request의 cookie 파싱
app.use(morgan("dev")); // 요청에대한 log 표시
app.use(helmet()); // 각종 보안관련된 header 세팅
```

### helmet이 추가해주는 header

각종 보안에 필요한 header들을 추가해준다.

자세한 사항은 helmet 문서를 보고 판단하길 바랍니다!

```
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
.
.
.

```
