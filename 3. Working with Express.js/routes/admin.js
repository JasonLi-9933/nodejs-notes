const express = require("express");
const path = require("path");
const router = express.Router();

// route: /admin/add-product => GET
router.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/add-product.html"));
});

// route: /admin/add-product => POST
router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
