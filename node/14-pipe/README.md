## pipe

앞서 stream 을 알게되었습니다!! 짝짝짝!!

단순히 읽는 stream만 알게되었었는데요

쓰는것도 알아봅시다!

## createWriteStream

이 함수는 쓰기전용 stream을 만듭니다.

write()를 이용해서 쓰고, end()를 호출하여 finish 이벤트를 발생시킵니다.

```js
const fs = require("fs");

const writeStream = fs.createWriteStream("./write.txt");

writeStream.on("finish", () => {
  console.log("end() 기 호출되면 finish 이벤트가 발생합니다");
});

writeStream.write("kong!");
writeStream.write("kongha");
writeStream.write("hello!");

writeStream.end();
```

## 더 나아가기

이제 stream 방식으로 읽고, 쓰기가 된다면,

읽으면서 쓰는동작을 해봅시다. 바로 pipe()를 연결해서 말이죠!

## node에서 stream 의 메서드 pipe()

공식문서에 이렇게 나와있네요!

> It is possible to attach multiple Writable streams to a single Readable stream.

"여러개의 쓰기 스트림을 하나의 읽기 스크림에 붙일수있다"

이말은 즉, 읽기 스트림에서 읽어들이면서, 쓰기 스트림으로 쓸수있다는 말이되겠네요!

## 예시 코드

공식문서의 코드를 보니, file을 읽고, 압축을 하는 zlib 스트림과 쓰는 writeStream을 만들어서 pipe()로 연결해주었네요

그럼 아래의 코드는 file.txt를 stream으로 읽어드리면서 압축하고, 그것을 file.txt.gz 로 만들어냅니다

```js
const fs = require("fs");
const r = fs.createReadStream("file.txt");
const z = zlib.createGzip();
const w = fs.createWriteStream("file.txt.gz");
r.pipe(z).pipe(w);
```

## 나의 예시 코드

저는 finish 이벤트도 걸어주어 한번 작성해보았습니다

```js
const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./file.txt");
const writeStream = fs.createWriteStream("./new2.zip");
const zlibStream = zlib.createGzip();

// pipe 연결
readStream
  .pipe(zlibStream)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("복사완료!");
  });
```

## 서버에서 활용하기

단순히 파일만 쓰는것이 아니라 서버에서도 streaming한다 라는 말이있죠?

서버에서 클라이언트의 response로 전달하는 값을 stream으로 읽고, pipe()로 연결하면 아래와 같은 코드가 됩니다.

1번의 경우 파일을 다 읽어, 메모리에 올린다음 전송하게되고,

2번의 경우에는 조금씩 읽어 메모리에 올리고 전송하게 됩니다.

1번의 문제점은 메모리의 용량보다 큰 파일을 읽을 수 없게되겠죠

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //1번
  const file = fs.readFileSync("./file.txt");
  res.end(file);

  //2번
  const stream = fs.createReadStream("./file.txt");
  stream.pipe(res);
});

server.listen(5252);
```

## 어그럼 http모듈에서 res는 Writable인가요?

네, 모듈정의를 타고타고들어가다보면

res는 ServerResponse 타입이고, 이타입은 OutgoingMessage 를 상속받고 이타입은 stream.Writable 를 상속받고있죠!

그렇기 때문에 pipe()로 연결이 가능한것입니다!
