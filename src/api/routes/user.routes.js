const express = require("express");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const passport = require('passport');
const passportConfig = require("../../config/passport/passport-config");
const verifyToken = require("../middlewares/auth");
passportConfig(passport);

router.get('/', (req, res) => {
    res.send("🚀 Api rodando")
});

router.get('/error', (req, res) => {
    res.send("Deu erro")
});


router.post("/user", userController.create);
router.get("/users", verifyToken, userController.findAll);
router.get("/user/:id", userController.findById);
router.get("/user/email/:email", userController.findByEmail);
router.put("/user/update/:id", userController.update);
router.delete("/user/delete/:id", userController.delete);

router.post("/auth/login", authController.login);
//TODO router.post("/auth/register", authController.register);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: "/error"}), (req,res) => {res.redirect("/")});


module.exports = router;
