const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const Camground = require("./models/campground");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/campground", async (req, res) => {
  const campground = await Campground.find({});
  res.send(campground);
});

// app.get("/campground/new", async (req, res) => {
//   const campground = new Campground({
//     title: "Pantai Tiku",
//     price: 150,
//     description: "My first beach ever",
//     location: "Tiku",
//   });
//   await campground.save();
//   res.send(campground);
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
