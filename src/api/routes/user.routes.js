const express = require("express");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/user", userController.create);
router.get("/users", userController.findAll);
router.get("/user/:id", userController.findById);
router.get("/user/email/:email", userController.findByEmail);
router.put("/user/update/:id", userController.update);
router.delete("/user/delete/:id", userController.delete);

router.post("/auth/login", authController.login);

module.exports = router;
