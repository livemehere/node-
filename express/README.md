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
