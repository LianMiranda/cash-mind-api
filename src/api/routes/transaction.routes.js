const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const router = express.Router()

router.post("/transaction", transactionController.create)
router.get("/transactions", transactionController.find)
router.get("/transaction/:id", transactionController.findById)
router.put("/transaction/:id", transactionController.update)
router.delete("/transaction/:id", transactionController.delete)
router.get("/transactions/:userId", transactionController.findByDate)

module.exports = router;