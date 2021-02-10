const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Product = require("./models/product");
const Farm = require("./models/farm");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
mongoose
  .connect("mongodb://localhost:27017/myFarm", {
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

const categories = ["fruit", "vegetable", "dairy"];

//FARM ROUTES
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});
app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});
app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate("products");
  res.render("farms/detail", { farm });
});
app.get("/farms/:id/products/new", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render("products/new", { categories, id, farm });
});
app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
});
app.delete("/farms/:id", async (req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  res.redirect("/farms");
});
//PRODUCT ROUTES
//READ
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const foundProducts = await Product.find({ category });
    res.render("products/index", { foundProducts, category });
  } else {
    const foundProducts = await Product.find({});
    res.render("products/index", { foundProducts, category: "All" });
  }
});
//CREATE
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const product = await newProduct.save();
  res.redirect(`/products/${product._id}`);
});
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});
//READ
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("farm", "name");
    res.render("products/detail", { product });
  } catch (error) {
    res.send("PATH NOT FOUND 404");
  }
});
//DISPLAY FORM TO CREATE NEW PRODUCT
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});
//UPDATE
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/products/${updatedProduct._id}`);
});
//DELETE
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
