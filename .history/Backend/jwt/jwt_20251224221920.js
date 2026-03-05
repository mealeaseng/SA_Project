const jwt = require("jsonwebtoken");

const SECRET = "my_secret_key";

// create token
const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: "1h" });

console.log("TOKEN:", token);

// verify token
jwt.verify(token, SECRET, (err, decoded) => {
  if (err) {
    console.log("Invalid token");
  } else {
    console.log("Decoded:", decoded);
  }
});
