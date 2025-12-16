const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { redirect } = require("react-router-dom");
const { isLoggedIn, isOwner, validateListing} = require("../middlewares.js");

const listingController = require("../controllers/listing.js");

//index route
router.get("/", wrapAsync(listingController. index));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//show route 
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post("/",isLoggedIn, validateListing,wrapAsync(listingController.createListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//upadate route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//Delete route
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;