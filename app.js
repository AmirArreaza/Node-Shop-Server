const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log(`In the middlewware`);
  console.log(`Request from ${req.url}`);
  next();//Allows the requrest to continue to the next middleware
});

app.use((req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  res.send('<h1>Express Js</h1>');
});

const server = http.createServer(app);

server.listen(3000);
