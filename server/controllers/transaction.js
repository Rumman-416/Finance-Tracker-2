const moment = require("moment");
const transactionModel = require("../models/transactionModel");

const getTransaction = async (req, res) => {
  try {
    const transactions = await transactionModel.find({
      userid: req.body.userid,
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : { date: { $gte: selectedDate[0], $lte: selectedDate[1] } }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getTransaction,
  getAllTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
