import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const { RangePicker } = DatePicker;

const ShowData = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [showModal, setShowModal] = useState(false);

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

  const handleDelete = async (transactionId) => {
    try {
      // Implement your logic to delete the transaction with the given ID
      await axios.delete(
        `http://localhost:8080/transactions/delete-transaction/${transactionId}`
      );

      // After deletion, fetch the updated list of transactions
      getAllTransactions();
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

  return (
    <>
      <Layout>
        <div className="flex gap-5 m-5 lg:ml-40">
          <div>
            <h6>Select frequency</h6>
            <Select
              value={frequency}
              className=" w-36 border-2 border-green-400 rounded-lg bg-transparent"
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option className="custom-option" value="7">
                Last 1 Week
              </Select.Option>
              <Select.Option className="custom-option" value="30">
                Last 1 Month
              </Select.Option>
              <Select.Option className="custom-option" value="365">
                Last 1 year
              </Select.Option>
              <Select.Option className="custom-option" value="custom">
                Custom
              </Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
          <div>
            <h6>Select type</h6>
            <Select
              value={type}
              className=" w-36 border-2 border-green-400 rounded-lg "
              onChange={(values) => setType(values)}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {allTransaction.map((transaction, index) => (
              <div
                className=" my-5 bg-green-400 p-5 minw-[20rem] rounded-md bg-opacity-60 flex lg:mx-16"
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
                  <div className="flex gap-5 my-3">
                    <RiDeleteBin6Line
                      className=" text-2xl text-red-500 hover:cursor-pointer"
                      onClick={() => handleDelete(transaction._id)}
                    />
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
