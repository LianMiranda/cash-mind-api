const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const router = express.Router()

router.post("/transaction", transactionController.create)
router.get("/transactions", transactionController.find)
router.get("/transaction/:id", transactionController.findById)
router.post("/transaction/:id", transactionController.update)

module.exports = router;