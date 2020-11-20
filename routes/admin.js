const express = require("express");
const router = express.Router();

// GET /admin/add-product

router.get("/add-product", (req, res, next) => {
  console.log(`In the Add-Product middlewware`);
  console.log(`Request from ${req.url}`);
  res.send(
    '<form action="/add-product" method="POST"><input type="text" name="title"><button type="submit">Add</button></input></form>'
  );
});

// POST /admin/add-product

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
