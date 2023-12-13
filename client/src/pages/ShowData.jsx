import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";

const ShowData = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");

  const categoryIcons = {
    food: "ss",
    entertainment: "ss",
  };

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `http://localhost:8080/transactions/get-transactions`,
        { userid: user._id, frequency, selectedDate, type }
      );
      setAllTransaction(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  const formatDateString = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const getCategoryIcon = (category) => {
    return categoryIcons[category];
  };

  return (
    <>
      <Layout>
        <div className="flex gap-8">
          <div className="mx-10 my-4">
            <h6>Select frequency</h6>
            <select
              value={frequency}
              className="w-36 h-7 bg-[#23253a] border border-green-400 rounded-md"
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="7">Last 1 Week</option>
              <option value="30">Last 1 Month</option>
              <option value="365">Last 1 year</option>
              <option value="custom">Custom</option>
            </select>
            {frequency === "custom" && (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            )}
          </div>
          <div className="mx-10 my-4">
            <h6>Select type</h6>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-36 h-7 bg-[#23253a] border border-green-400 rounded-md"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="grid grid-cols-1">
            {allTransaction.map((transaction, index) => (
              <div
                className=" my-5 bg-green-400 p-5 w-full rounded-md bg-opacity-60 flex"
                key={index}
              >
                <div>
                  <div className="flex justify-between ">
                    <h1 className=" text-[#23253a]">
                      Name:
                      <span className=" text-white">{transaction.name}</span>
                    </h1>
                  </div>
                  <div className="flex justify-between ">
                    <h1 className="text-[#23253a]">
                      Type:{" "}
                      <span className="text-white"> {transaction.type}</span>
                    </h1>
                  </div>
                  <h1 className="text-[#23253a]">
                    Category:{" "}
                    <span className="text-white"> {transaction.category}</span>
                  </h1>
                  <h1 className=" w-80 text-[#23253a]">
                    Description:{" "}
                    <span className="text-white">
                      {transaction.description}
                    </span>
                  </h1>
                  <div className="flex items-center">
                    <CiCalendarDate className="text-[#23253a] text-xl" />
                    <h1>{formatDateString(transaction.date)}</h1>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-8">
                  <h1 className="flex items-center">
                    <FaRupeeSign className=" text-[#23253a]" />
                    {transaction.amount}
                  </h1>
                  <div>
                    <BsCashCoin
                      className={`text-3xl ${
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ShowData;
