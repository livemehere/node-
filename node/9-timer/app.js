console.log("code1");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
console.log("code2");
setImmediate(() => {
  console.log("setTimeout");
}, 0);
console.log("code3");

process.nextTick(() => {
  console.log("nextTick");
}, 0);

/*
code1
code2
code3
nextTick
setTimeout
setTimeout
*/
