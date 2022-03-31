const path = require("path");

console.log(__dirname); // /Users/gongtaemin/Documents/노드에대한 모든것/10-path
console.log(__filename); // /Users/gongtaemin/Documents/노드에대한 모든것/10-path/index.js

console.log(path.sep); // OS별 구분자 '/'
console.log(path.delimiter); // OS별 환경변수 구분자 ':'

console.log(path.basename(__filename)); // index.js
console.log(path.basename(__filename, ".js")); // index 확장자명 추출
console.log(path.basename(__dirname)); // 10-path

console.log(path.dirname(__filename)); // /Users/gongtaemin/Documents/노드에대한 모든것/10-path

console.log(path.extname(__filename)); // .js

const parsed = path.parse(__filename);
console.log(parsed);
/**
 * {
  root: '/',
  dir: '/Users/gongtaemin/Documents/노드에대한 모든것/10-path',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
 * 
 */

console.log(path.format(parsed)); // /Users/gongtaemin/Documents/노드에대한 모든것/10-path/index.js

// 절대겨로인지 아닌지 boolean
console.log(path.isAbsolute(__dirname)); // true
console.log(path.isAbsolute("../")); // false

console.log(path.normalize("./path////////sub")); // 잘못된 경로면 바르게 고쳐줌

// OS에 맞는 구분자를 사용해서 경로를 합쳐줌
console.log(path.join(__dirname, "image")); ///Users/gongtaemin/Documents/노드에대한 모든것/10-path/image
console.log(__dirname + path.sep + "image"); // 같은결과이나 위에것이 더 적절
