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

Product.insertMany([
  { name: "manggo", price: 0.56, category: "fruit" },
  { name: "cabbage", price: 0.5, category: "vegetable" },
  { name: "brocoli", price: 0.3, category: "vegetable" },
  { name: "potato", price: 0.6, category: "vegetable" },
  { name: "apple", price: 1.99, category: "fruit" },
  { name: "milk", price: 2.12, category: "dairy" },
  { name: "cheese", price: 1.87, category: "dairy" },
])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
