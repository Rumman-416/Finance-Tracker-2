const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

//router object
const router = express.Router();

//routers
//add transaction
router.post("/add-transaction", addTransaction);
//get transactions
router.post("/get-transactions", getAllTransaction);
router.post("/get-only-transactions", getTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);

module.exports = router;
