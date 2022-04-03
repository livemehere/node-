const jwt = require("jsonwebtoken");

const secretKey = "koha";

const token = jwt.sign(
  {
    id: "kong12",
    username: "kong",
    age: 25,
  },
  secretKey,
  { expiresIn: "1 days" }
);

const result = jwt.decode(token);
console.log(result);

const result2 = jwt.verify(token, secretKey, (err, decoded) => {
  if (err) console.log(err);
  console.log(decoded);
});
