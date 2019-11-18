const jwt = require("jsonwebtoken");
const token = jwt.sign({ alex: "1234" }, "shared-secret");
console.log(token);
console.log(token);
