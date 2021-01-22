const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopDB", {
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

//CREATE PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    maxlength: 16,
    trim: true,
  },
  price: { type: Number, required: true, min: 0 },
  isStock: { type: Boolean, default: true },
  categories: { type: [String], default: ["online"] },
  quantity: {
    online: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  tipe: {
    type: String,
    default: "M",
    enum: ["XS", "S", "M", "L", "XL"],
  },
});
productSchema.methods.toggleStock = function () {
  this.isStock = !this.isStock;
  return this.save();
};
productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};
productSchema.methods.incPrice = function () {
  this.price += 50;
  return this.save();
};
productSchema.statics.all200 = function () {
  return this.updateMany({}, { price: 200 });
};
productSchema.statics.allOut = function () {
  return this.updateMany({}, { isStock: false });
};
productSchema.statics.allAvailable = function () {
  return this.updateMany({}, { isStock: true });
};
//CREATE PRODUCT MODEL
const Product = mongoose.model("Product", productSchema);
// CREATE PRODUCT INSTANCE
// const smartphone = new Product({
//   name: "rocks",
//   price: 10.1,
// });
// smartphone
//   .save()
//   .then((data) => {
//     console.log("IT WORKED");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO SOMETHING WENT WRONG");
//     console.log(err);
//   });
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "NOKIA" });
  console.log(foundProduct.price);
  await foundProduct.incPrice();
  console.log(foundProduct.price);
};
// findProduct();

// Product.all200().then((data) => console.log(data));
// Product.allOut().then((data) => console.log(data));
Product.allAvailable().then((data) => console.log(data));

//INSERT MANY DOCUMENTS
// Product.insertMany([
//   { name: "sony", price: 100, isStock: false },
//   { name: "nokia", price: 250.35 },
//   { name: "samsung", price: 300.5 },
//   { name: "ericson", price: 90.55, isStock: false },
//   { name: "advan", price: 120.76, isStock: false },
//   { name: "xiaomi", price: 221.45 },
//   { name: "oppo", price: 211.99 },
//   { name: "vivo", price: 215.12 },
//   { name: "realme", price: 233.23 },
//   { name: "iphone", price: 543.99 },
// ]).then((data) => {
//   console.log(data);
// });

// Product.findOneAndUpdate(
//   { name: "MITO" },
//   { price: 99.99 },
//   { new: true, runValidators: true }
// ).then((data) => console.log(data));
