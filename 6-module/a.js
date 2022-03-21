const {count,getCount,increase} = require('./b.js');

console.log(count)
increase();
console.log(getCount())

console.log(this === module.exports) // true
console.log(module.exports === exports) // true
console.log(this === exports) // true
console.log(this === global) // false





let ha = 8;

console.log(module === global)

