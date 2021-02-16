const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

router.post(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "sucessfully create review");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewID",
  catchAsync(async (req, res) => {
    const { id, reviewID } = req.params;
    await Campground.findOneAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findOneAndDelete(reviewID);
    req.flash("success", "successfully deleted review");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
