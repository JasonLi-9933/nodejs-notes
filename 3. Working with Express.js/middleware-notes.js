// const http = require("http");
const express = require("express");

const app = express();

// adding middleware;
// next: next middleware function
app.use((req, res, next) => {
  console.log("middleware1");
  req.prop = 123;
  next();
});
app.use("/", (req, res, next) => {
  console.log("middleware2" + req.prop);
  // send response here instead of calling next
  res.send("<h1>expressjs</h1>");
});

app.listen(3000);
// equivalent to :
// const server = http.createServer(app);
// server.listen(3000);
