const express = require("express");
const app = express();
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");

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
const Review = require("./models/review");

app.engine("ejs", engine);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/campgrounds", { campgrounds });
});
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});
app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    res.render("campgrounds/show", { campground });
  })
);
app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    if (!req.body.campgrounds) throw new ExpressError("Invalid data", 400);
    const campground = new Campground(req.body);
    const newCamp = await campground.save();
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);
app.put(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/campgrounds/${camp._id}`);
  })
);
app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);
app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.post(
  "/campgrounds/:id/reviews",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id/reviews/:reviewID",
  catchAsync(async (req, res) => {
    const { id, reviewID } = req.params;
    await Campground.findOneAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findOneAndDelete(reviewID);
    res.redirect(`/campgrounds/${id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found!", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No! Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
