let num = 1;

// timer 생성 ,제거
const interval = setInterval(() => {
  console.log(num++);
}, 1000);

setTimeout(() => {
  clearInterval(interval);
}, 6000);
