// 고정된 메모리 덩어리
// 숫자의 배열, 데이터의 바이트 그 자체를 가르킨다

// from 으로 string을 버퍼를 만들수 있음
const buf = Buffer.from("hi");

console.log(buf); // <Buffer 68 69> 유니코드로 표현됨
console.log(buf[0]); // 104
console.log(buf[1]); // 105
console.log(buf.toString()); // hi

// 빈 Buffer 생성
const buf2 = Buffer.alloc(2);
const buf3 = Buffer.allocUnsafe(2);
console.log(buf2); // <Buffer 00 00>

// 복사
buf.copy(buf3);
console.log(buf3); // <Buffer 68 69>

// 합치기
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf); // <Buffer 68 69 00 00 68 69>
