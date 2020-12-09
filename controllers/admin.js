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
  const newProduct = new Product(title, price, description, imageUrl);
  newProduct
    .save()
    .then((result) => {
      console.log("Product created!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

/*

exports.getEditProduct = (req, res, next) => {
  console.log(`Add-Product Controller`);
  console.log(`Request from ${req.url}`);
  const editMode = req.query.edit;
  console.log(`Edit Mode ${editMode}`);
  if (!editMode) res.redirect("/");

  const prodId = req.params.productId;
  console.log(`Edit Mode ${prodId}`);
  //Product.findByPk(prodId)
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const udpatedTitle = req.body.title;
  const udpatedPrice = req.body.price;
  const udpatedImageUrl = req.body.imageUrl;
  const udpatedDescription = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = udpatedTitle;
      product.price = udpatedPrice;
      product.imageUrl = udpatedImageUrl;
      product.description = udpatedDescription;
      product.title = udpatedTitle;

      return product.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      product.destroy();
      console.log("Product removed");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  //Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
*/
