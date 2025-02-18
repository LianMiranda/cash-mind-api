const authController = require("../controllers/auth.controller");
const express = require('express');
const router = express.Router()
const passport = require('passport');
const passportConfig = require("../../config/passport/passport-config");

passportConfig(passport);

router.post("/auth/login", authController.login);
//TODO router.post("/auth/register", authController.register);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: "/error"}), authController.oAuth);

module.exports = router;