const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { redirect } = require("react-router-dom");
const { isLoggedIn, isOwner, validateListing} = require("../middlewares.js");

const listingController = require("../controllers/listing.js");

router
  .route("/")
  .get( wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing,wrapAsync(listingController.createListing)
   );

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;