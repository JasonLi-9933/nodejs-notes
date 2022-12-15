const products = [];

const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(_title) {
    this.title = _title;
  }

  save() {
    fs.readFile(filePath, (err, data) => {
      getProductsFromFile((products) => {
        products.push(this); // this refers to the instance as it is inside an arrow function
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
