const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log(`This always runs`);
  console.log(`Request from ${req.url}`);
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log(`In the Add-Product middlewware`);
  console.log(`Request from ${req.url}`);
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add</button></input></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  res.send("<h1>Express Js</h1>");
});

app.listen(3000);
