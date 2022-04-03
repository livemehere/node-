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

## templates(ejs) 사용해서 SSR 만들어보기

ejs 는 php와 같이 html에 내장된 javascript구분을 해석하는 도구입니다.

지금은 메모리상에서 username, dataList를 보내주고있지만, 이를 node환경에서 database와 연결하고, 값을 전달해주면 일반적인 SSR이 되는것입니다.

> 여기서 ejs.renderFile()은 Ejs파일을 해석한후 data로 반환합니다. 그 data를 res 로 보내주면 되는것입니다. write()를 생략하고 단순히 res.send(data) 이렇게 해주어도 됩니다.

```js
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    ejs
      .renderFile("./templates/index.ejs", { username: "kong", dataList: ["html", "css", "js", "node"] })
      .then((data) => {
        res.write(data);
        res.end();
      });
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080);
```

### index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Welcom! <%= username %></h1>
    <p>안녕하세요 저는 그냥 기본 http 모듈이에요!</p>
    <ul>
      <% dataList.forEach(item => { %>
      <li><%= item %></li>
      <% }); %>
    </ul>
  </body>
</html>
```
