const mongoose = require("mongoose");
const Product = require("./models/product");
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

// const fruit = new Product({ name: "orange", price: 1.99, category: "fruit" });
// fruit
//   .save()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Product.insertMany([
//   { name: "manggo", price: 0.56, category: "fruit" },
//   { name: "cabbage", price: 0.99, category: "vegetable" },
//   { name: "brocoli", price: 0.39, category: "vegetable" },
//   { name: "potato", price: 0.69, category: "vegetable" },
//   { name: "apple", price: 0.99, category: "fruit" },
// ])
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
