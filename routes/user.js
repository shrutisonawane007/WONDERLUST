const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userControllers = require("../controllers/users.js");
const user = require("../models/user.js");


router.get("/signup",userControllers.renderSignUpForm);

router.post("/signup",wrapAsync(userControllers.signUp));

router.get("/login",userControllers.renderLoginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureFlash : true,
        failureRedirect : "/login"
    }),userControllers.login);

router.get ("/logout",userControllers.logout);

module .exports = router;