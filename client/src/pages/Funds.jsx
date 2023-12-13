import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

const Funds = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [userFunds, setUserFunds] = useState([]);

  const funds = [
    {
      name: "Guaranteed income plan",
      type: "low",
      payment: 1000,
      interest: "8%",
      period: 24,
    },
    {
      name: "High return plan",
      type: "mid",
      payment: 3000,
      interest: "9%",
      period: 36,
    },
    {
      name: "Insurance",
      type: "high",
      payment: 5000,
      interest: "4%",
      period: 12,
    },
    {
      name: "Oldage retuns",
      type: "mid",
      payment: 8000,
      interest: "8%",
      period: 24,
    },
    {
      name: "Mixamo return plans",
      type: "high",
      payment: 7500,
      interest: "5%",
      period: 18,
    },
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `http://localhost:8080/transactions/get-only-transactions`,
        { userid: user._id }
      );
      setAllTransaction(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalIncomeTransactions = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const getFundsType = (totalIncome) => {
    if (totalIncome < 10000) {
      return ["low", "mid", "high"];
    } else if (totalIncome >= 10000 && totalIncome <= 50000) {
      return ["mid"];
    } else {
      return ["high"];
    }
  };

  const calculateInterest = (amount, interestRate, period) => {
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const totalInterest =
      amount * (Math.pow(1 + monthlyInterestRate, period) - 1);
    return totalInterest.toFixed(2);
  };

  const calculateTime = (period) => {
    const years = Math.floor(period / 12);
    const months = period % 12;
    return `${years} years ${months} months`;
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    const fundsTypes = getFundsType(totalIncomeTransactions);

    const filteredFunds = funds
      .filter((fund) => fundsTypes.includes(fund.type))
      .map((fund) => ({
        ...fund,
        totalInterest: calculateInterest(
          fund.payment * fund.period,
          fund.interest,
          fund.period
        ),
        time: calculateTime(fund.period),
      }));

    setUserFunds(filteredFunds);
  }, [totalIncomeTransactions]);

  return (
    <Layout>
      <div>Total Income Transactions: ${totalIncomeTransactions}</div>

      {totalIncomeTransactions < 10000
        ? funds.map((fund, index) => (
            <div
              key={index}
              className=" m-5 border-2 border-green-400 rounded-lg"
            >
              {fund.name} - Payment: ${fund.payment} - Period: {fund.period}{" "}
              months
            </div>
          ))
        : userFunds.map((fund, index) => (
            <div
              key={index}
              className=" p-2  m-7 border-2 border-[#ff4b56] rounded-lg flex flex-col gap-2"
            >
              <div className="flex gap-2">
                <h1 className=" text-green-400">Investment :</h1>
                <h1>{fund.name}</h1>
              </div>
              <div className="flex gap-2">
                <h1 className=" text-green-400">Period of Investment :</h1>
                <h1>{fund.period} months</h1>
              </div>
              <div className="flex gap-2">
                <h1 className=" text-green-400">Amount to be invested :</h1>
                <h1>{fund.payment} </h1>
              </div>
              <div className="flex gap-2">
                <h1 className=" text-green-400">Total Interest :</h1>
                <h1>{fund.totalInterest}</h1>
              </div>
            </div>
          ))}
    </Layout>
  );
};

export default Funds;
