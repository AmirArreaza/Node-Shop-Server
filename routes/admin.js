const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log(`In the Add-Product middlewware`);
  console.log(`Request from ${req.url}`);
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add</button></input></form>'
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
