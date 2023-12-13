const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getTransaction,
  updateTransaction,
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
router.put("/update-transaction/:id", updateTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);

module.exports = router;
