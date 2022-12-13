const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { router: adminRoutes, products } = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// path filtering
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// catch-up
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
