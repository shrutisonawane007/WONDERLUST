const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userControllers = require("../controllers/users.js");
const user = require("../models/user.js");

router.route("/signup")
    .get(userControllers.renderSignUpForm)
    .post(wrapAsync(userControllers.signUp));

router.route("/login")
    .get(userControllers.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local",{
        failureFlash : true,
        failureRedirect : "/login"
    }),userControllers.login);

router.get ("/logout",userControllers.logout);

module .exports = router;