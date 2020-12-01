const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
};

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(`Looking for ${prodId} Product`);
  Product.findById(prodId, (product) => {
    console.log("-> ", product);
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      product: product,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

exports.addToCart = (req, res, next) => {
  console.log("Adding product", req.body.productId);
  const prodId = req.body.productId.id;
  res.redirect('/')
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Your Checkout",
    path: "checkout",
  });
};
