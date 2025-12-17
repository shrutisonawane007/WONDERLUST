const express = require("express");
const router = express.Router({mergeParams : true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn, isRevieweAuthor} = require("../middlewares.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewControllers = require("../controllers/reviews.js");

//post route
router.post("/",
  isLoggedIn, validateReview,wrapAsync( reviewControllers.createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn,isRevieweAuthor,
   wrapAsync(reviewControllers.destroyReview));
module.exports = router;