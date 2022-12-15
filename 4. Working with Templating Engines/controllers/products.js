const Product = require("../models/product");

exports.getAddProductPage = (req, res) => {
  // res.sendFile(path.join(__dirname, "../views/add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

// const products = [];
exports.postAddProduct = (req, res) => {
  console.log(req.body);
  const newProduct = new Product(req.body.title);
  newProduct.save();
  res.redirect("/");
};

exports.getShopPage = (req, res) => {
  // res.sendFile(path.join(__dirname, "../views/shop.html"));
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};
