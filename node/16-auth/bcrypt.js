const bcrypt = require("bcrypt");

const pw = "kong1234";

const hashed = bcrypt.hashSync(pw, 10); // salt가 증가할수록, 연산 시간이 기하급수적으로 늘어난다.
console.log(pw); // kong1234
console.log(hashed); // $2b$10$0xFKk6zY/Fuu/.pidoKxK.9LEgR41hGK4uhkhTP/RGY.VxOpMNmLW

const result = bcrypt.compareSync(pw, hashed);
console.log(result); // true
