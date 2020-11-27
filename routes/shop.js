const path = require("path");

const express = require("express");
const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
