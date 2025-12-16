const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { redirect } = require("react-router-dom");
const { isLoggedIn, isOwner, validateListing} = require("../middlewares.js");


//index route
router.get("/", wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//New Route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});


//show route 
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
      req.flash("error","Cannot find that listing!");  
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));

//Create Route
router.post("/",isLoggedIn, validateListing,
     wrapAsync(async(req,res,next)=>{
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      await newListing.save();
      req.flash("success","Successfully made a new listing");
      res.redirect("/listings");
    })
);

//edit route
router.get("/:id/edit",isLoggedIn,
    isOwner,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    if(!listing){
      req.flash("error","Cannot find that listing!");  
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//upadate route
router.put("/:id",isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id", isLoggedIn,
    isOwner, 
    wrapAsync( async(req,res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
     req.flash("success","Listing deleted successfully");
    res.redirect("/listings"); 
}));

module.exports = router;