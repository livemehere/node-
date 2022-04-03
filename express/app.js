import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

// 동기작업 에러 처리
app.get("/file1", (req, res, next) => {
  try {
    const data = fs.readFileSync("./file1.txt");
  } catch (e) {
    res.status(404).send("file not found");
  }
});

// 비동기작업 에러 처리 (callback)
app.get("/file2", (req, res, next) => {
  // callback형태의 비동기작업은 err가 callback으로 넘어가기 때문에, 외부에서 에러가 던져지지 않는다. callback 내에서 처리해 주어야한다.
  fs.readFile("./file2.txt", (err) => {
    if (err) {
      res.status(404).send("file2 not found!");
    }
  });
});

// 비동기작업 에러 처리 (promise)
app.get("/file3", (req, res, next) => {
  fs.promises
    .readFile("./file3")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      console.log("promise err");
      res.status(404).send("prmise err");
    });
});

// 비동기작업 에러 처리 (promise to next)
app.get("/file4", (req, res, next) => {
  fs.promises.readFile("./file4").catch((e) => next(e));
});

// 비동기작업 에러 처리 (async)
app.get("/file5", async (req, res, next) => {
  try {
    const data = await fs.promises.readFile("./file5");
  } catch (e) {
    console.log("async error");
  }
});

// 미들웨어에서 에러가 발생하면 모두 여기로 넘어온다.(미들웨어 내에서 에러처리를 하지 않을때)
app.use((error, req, res, next) => {
  console.log("error");
  res.send({ message: "만능 error 발생!" });
});

app.listen(8080);
