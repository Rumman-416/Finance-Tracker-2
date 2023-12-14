// Home.jsx

import React, { useState, useEffect, Suspense } from "react";
import Layout from "../components/layout/Layout";
import Spinner from "../components/Spinner";
import axios from "axios";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";

const Analytics = React.lazy(() => import("../components/Analytics"));

const AddTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/transactions/add-transaction",
        {
          ...values,
          userid: user._id,
        }
      );
      setLoading(false);
      setShowModal(false);
      console.log(response.data);
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `http://localhost:8080/transactions/get-only-transactions`,
        { userid: user._id }
      );
      setAllTransaction(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
      <Suspense fallback={<p> Loading</p>}>
        <Analytics allTransaction={allTransaction} />
      </Suspense>
      <div>
        <div className="flex justify-center items-center ">
          <button
            onClick={() => setShowModal(true)}
            className=" bg-green-400 w-56 h-10 rounded-md hover:bg-opacity-30 m-5"
          >
            Add New Transaction
          </button>
        </div>
        <Modal
          title="Add Transaction"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter a name",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please enter a positive amount",
                },
                {
                  pattern: /^[1-9]\d*(\.\d+)?$/, // Regex to validate positive numbers (including decimals)
                  message: "Amount must be a positive number",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please select a type",
                },
              ]}
            >
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select a category",
                },
              ]}
            >
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="entertainment">
                  Entertainment
                </Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
                <Select.Option value="bill">Bills</Select.Option>
                <Select.Option value="others">Others</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please select a date",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <div className="flex justify-end items-center">
              <button type="submit" className="border-2 h-8 w-16">
                Save
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default AddTransaction;
