## stream 의개념

stream이란 어떤 데이터를 읽어낼 때, 한번에 다 읽어들이는게 아니라, 부분부분 읽어들이는 것을 말합니다.

예를들어서 1시간짜리 동영상파일을 유튜브로 스트리밍받을때, 모두 다운로드가 되고서야 보는것이 아니죠

인터넷환경에따라서 stream으로 불러오며 buffer를 채우면서 buffering을 합니다.

이처럼 매우 큰 용량의 데이터는 한번에읽어서보는것보다,조금씩 읽어들이는것이 효과적이죠(상황에따라 다르겠지만요)

## 예시코드

node 에서 제공하는 createReadStream은, 이벤트기반으로, 이벤트가 발생시 callback을 호출하도록 합니다.

아래의 코드는 데이터를 chunk 단위로 읽어들일때마다 [] 빈배열에 그값을 추가하고

파일데이터를 모두 읽었을때에는 console로 출력하는 코드입니다.

```js
const fs = require("fs");

const data = [];

fs.createReadStream("./file.txt", "utf8")
  .on("data", (chunk) => {
    // 데이터를 읽을 떄 발생하는 이벤트(chunk가 파일을 다읽을떄까지 전달)
    data.push(chunk);
  })
  .on("end", () => {
    console.log(data);
  });
```
