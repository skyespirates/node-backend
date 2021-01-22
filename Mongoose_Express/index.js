const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO MONGOO DB");
  })
  .catch((err) => {
    console.log("OH NO SOMETHING WENT WRONG");
    console.log(err);
  });

//SHOW ALL PRODUCTS
app.get("/products", async (req, res) => {
  const foundProducts = await Product.find({});
  res.render("products/index", { foundProducts });
});
//SHOW DETAILS ONE PRODUCT
app.get("/products/new", (req, res) => {
  res.render("products/new");
});
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/detail", { product });
  } catch (error) {
    res.send("PATH NOT FOUND 404");
  }
});
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});
app.post("/products", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  res.redirect("/products");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
