const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { router: adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/admin", // path filtering
  adminRoutes
);
app.use(shopRoutes);

// catch-all
app.use(errorController.get404Page);

app.listen(3000);
