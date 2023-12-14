import React from "react";
/*import { Link } from "react-router-dom";*/
import moneyminder from "../assets/images/moneyminder.png";
const Start = () => {
  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <h1 className=" text-4xl font-heading m-10 font-bold">MoneyMinder</h1>
      <img src={moneyminder} className=" h-[28rem] my-10" />
      <button className="h-10 w-36 bg-green-400 rounded-xl text-[#23253a] bg-opacity-40 border border-green-400 hover:bg-opacity-100 font-normal">
        Get Started
      </button>
      <div className=" bg-green-400 m-10 w-10/12 bg-opacity-70 p-3">
        <h1 className=" font-heading text-3xl text-[#23253a] font-bold">
          Why MoneyMinder ?
        </h1>
        <span className=" font-para ">
          MoneyMinder is a comprehensive personal finance web application that
          tracks income, expenses, and predicts future spending based on
          historical data. It provides tailored investment plans, ensuring
          financial well-being and security.
        </span>
      </div>
    </div>
  );
};

export default Start;
