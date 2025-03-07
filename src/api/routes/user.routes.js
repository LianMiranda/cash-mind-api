const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const verifyToken = require("../middlewares/authUser");

router.get("/users", userController.findAll);
router.get("/user/:id", userController.findById);
router.get("/user/email/:email", userController.findByEmail);
router.put("/user/update/:id", userController.update);
router.delete("/user/delete/:id", userController.delete);

module.exports = router;
