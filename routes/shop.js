const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  res.send("<h1>Express Js</h1>");
});

module.exports = router;
