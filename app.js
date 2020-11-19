const express = require("express");

const app = express();

app.use('/', (req, res, next) => {
  console.log(`This always runs`);
  console.log(`Request from ${req.url}`);
  next();
});
app.use('/product', (req, res, next) => {
  console.log(`In the Product middlewware`);
  console.log(`Request from ${req.url}`);
  res.send('<h1>Express Js -Product-</h1>');
});

app.use('/', (req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  res.send('<h1>Express Js</h1>');
});

app.listen(3000);
