const express = require("express");
const router = express.Router({mergeParams : true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn} = require("../middlewares.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


//post route
router.post("/",
  isLoggedIn, validateReview,wrapAsync( async(req,res)=>{
   let listing = await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();
    req.flash("success","New review added successfully");

  res.redirect(`/listings/${listing._id}`);
}));

//delete review route
router.delete("/:reviewId", isLoggedIn, wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully");
    res.redirect(`/listings/${id}`);
}));
module.exports = router;