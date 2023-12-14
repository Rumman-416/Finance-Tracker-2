import React from "react";
import { useNavigate } from "react-router-dom";
import moneyminder from "../assets/images/moneyminder.png";
import Footer from "../components/layout/Footer";

const Start = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <>
      <div className="lg:min-h-[52.5rem]">
        <div className=" w-full flex justify-center items-center ">
          <h1 className="text-4xl font-heading m-10 font-bold">MoneyMinder</h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center lg:flex-row lg:w-full lg:">
          <img
            src={moneyminder}
            className="min-h-[25rem] m-10"
            alt="MoneyMinder Logo"
          />

          <div className="bg-green-400 m-10 w-10/12 bg-opacity-30 p-3 border border-green-400 rounded-lg flex flex-col gap-5 lg:w-[30rem]">
            <h1 className="font-heading text-3xl text-[#23253a] font-bold">
              Why MoneyMinder?
            </h1>
            <p className="font-para">
              MoneyMinder is a comprehensive personal finance web application
              that tracks income, expenses, and predicts future spending based
              on historical data. It provides tailored investment plans,
              ensuring financial well-being and security.
            </p>
            <button
              className="h-10 w-36 bg-[#23253a] rounded-xl text-[#23253a] bg-opacity-50 text-green-400 border border-green-400 hover:bg-opacity-100 font-normal"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Start;
