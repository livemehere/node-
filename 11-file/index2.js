const fs = require("fs").promises;

// reading
fs.readFile("./king.txt", { encoding: "utf8" })
  .then((data) => console.log(data))
  .catch((e) => console.log(e));

// writing
fs.writeFile("./ha.txt", "ha ha ha !").catch(console.log);
fs.appendFile("./apen.txt", "ssshelool!");

// copy
fs.copyFile("./apen.txt", "./apen-cp.txt");

// make directory
fs.mkdir("./myboy");

// read all of file in directory
fs.readdir("./").then(console.log);

// remove
fs.rm("./king.txt");
