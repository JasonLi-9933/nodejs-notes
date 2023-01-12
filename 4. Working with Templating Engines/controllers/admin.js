const Product = require("../models/product");

exports.getAddProductPage = (req, res) => {
  // res.sendFile(path.join(__dirname, "../views/add-product.html"));
  res.render("admin/add-product", {
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
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
  const newProduct = new Product(title, imageUrl, price, description);
  newProduct.save();
  res.redirect("/");
};

exports.getProductsPage = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
}