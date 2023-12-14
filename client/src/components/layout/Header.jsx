import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import moneyLogo from "../../assets/images/moneyLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(" ");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.alert("User logged out");
    navigate("/login");
  };
  return (
    <div>
      <nav className="  flex gap-5 h-20">
        <SideNav />
        <div className=" w-10/12 flex justify-center items-center  lg:w-3/12">
          <Link
            to="/add-data"
            className="flex justify-center items-center gap-3"
          >
            <img src={moneyLogo} alt="" className=" h-7" />
            <h1>MoneyMinder</h1>
          </Link>
        </div>
        <div className="flex justify-end w-full items-center">
          <h1 className=" text-xl">
            Hello ,
            <span className=" text-green-400">
              {" "}
              {loginUser && loginUser.name}
            </span>
          </h1>
          <button
            className=" bg-green-400 w-20 h-10 rounded-md hover:bg-opacity-30 mx-5"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
