const path = require("path");

const express = require("express");
const router = express.Router();

const adminData = require('./admin');

router.get("/", (req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  console.log(adminData.products);
  res.sendFile(path.join(__dirname, '../', "views", "shop.html"));
});

module.exports = router;