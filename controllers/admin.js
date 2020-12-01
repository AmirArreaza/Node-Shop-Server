const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  console.log(`Add-Product Controller`);
  console.log(`Request from ${req.url}`);
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  console.log(`Add-Product Controller`);
  console.log(`Request from ${req.url}`);
  const editMode = req.query.edit;
  console.log(`Edit Mode ${editMode}`);
  if (!editMode) res.redirect("/");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: editMode,
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
