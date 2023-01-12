const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const productsController = require("../controllers/shop");

// route: /admin/add-product => GET
router.get("/add-product", adminController.getAddProductPage);

// route: /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// route: /admin/products => GET
router.get("/products", adminController.getProductsPage);

module.exports = {
  router,
};
