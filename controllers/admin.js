const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  console.log(`Add-Product Controller`);
  console.log(`Request from ${req.url}`);
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      console.log("Product Added");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  console.log(`Add-Product Controller`);
  console.log(`Request from ${req.url}`);
  const editMode = req.query.edit;
  console.log(`Edit Mode ${editMode}`);
  if (!editMode) res.redirect("/");

  const prodId = req.params.productId;
  console.log(`Edit Mode ${prodId}`);
  Product.findById(prodId, (product) => {
    if (!product) res.redirect("/");
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const udpatedTitle = req.body.title;
  const udpatedPrice = req.body.price;
  const udpatedImageUrl = req.body.imageUrl;
  const udpatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    udpatedTitle,
    udpatedImageUrl,
    udpatedDescription,
    udpatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
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
