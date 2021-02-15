const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/campgrounds", { campgrounds });
});
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    if (!campground) {
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body);
    const newCamp = await campground.save();
    req.flash("success", "successfully create a new campground");
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    req.flash("success", "successfully updated campground");
    res.redirect(`/campgrounds/${camp._id}`);
  })
);
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "succesfully deleted campground");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
