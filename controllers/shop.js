const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  console.log(`In another the middlewware`);
  console.log(`Request from ${req.url}`);
  Product.findAll({})
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(`Looking for ${prodId} Product`);
  //Product.findByPk({
  Product.findAll({
    where: {
      id: prodId,
    },
  })
    .then((products) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        product: products[0],
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll({})
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop Index",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log(cart);
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addToCart = (req, res, next) => {
  console.log("Adding product", req.body.productId);
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/");
};

exports.postCartDeleteItem = (req, res) => {
  const prodId = req.body.productId;
  console.log("Removing", prodId);
  Product.findById(prodId, (product) => {
    console.log("Removing", product);
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
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
