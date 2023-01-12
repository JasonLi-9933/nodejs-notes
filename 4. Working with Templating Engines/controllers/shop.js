const Product = require("../models/product");

exports.getProductsPage = (req, res) => {
  // res.sendFile(path.join(__dirname, "../views/shop.html"));
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndexPage = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "All Products",
      path: "/",
    });
  });
};

exports.getCartPage = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "My Cart",
    path: "/cart",
  });
};

exports.getCheckoutPage = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout Page",
    path: "/checkout",
  });
};

exports.getOrdersPage = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "My Orders",
    path: "/orders",
  });
};