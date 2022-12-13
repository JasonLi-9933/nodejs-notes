const express = require("express");
const path = require("path");
const { products } = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(products);
  // res.sendFile(path.join(__dirname, "../views/shop.html"));
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
