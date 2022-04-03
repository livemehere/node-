## 기본골격

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log("incoming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  res.write("welcome!");
  res.end();
});

server.listen(8080);
```

## html 파일을 읽어서 전송

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    const buff = fs.readFileSync("./index.html");
    res.write(buff);
  }
  res.end();
});

server.listen(8080);
```

## header 설정해보기

```js
if (url === "/") {
  const buff = fs.readFileSync("./index.html");
  res.setHeader("Content-Type", "text/html");
  res.write(buff);
}
```

![](./img/1.png)

> header를 명시할 경우 chrome에서 Resopnse header에 추가된 것을 확인해 볼 수있다

## stream을 이용해서 전달해보기

> res.end()는 제거해주어야합니다. stream은 동기적으로 처리되는 것이 아니기 때문에, end를 작성한다면, stream으로 완전히 전달되기 전에 end가 호출되면서 응답을 수행을 제대로 하지 못합니다.

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    fs.createReadStream("./html/index.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080);
```
