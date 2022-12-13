const express = require("express");
const path = require("path");
const router = express.Router();

const products = [];

// route: /admin/add-product => GET
router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(__dirname, "../views/add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

// route: /admin/add-product => POST
router.post("/add-product", (req, res) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = {
  router,
  products,
};
