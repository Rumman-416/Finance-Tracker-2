import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      setLoading(false);
      window.alert(`login successful`);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/add-data");
    } catch (error) {
      setLoading(false);
      window.alert(`Failed to login`);
    }
  };
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <div className=" flex flex-col justify-center items-center h-[100vh]">
        <div className=" bg-green-400 bg-opacity-20 border-2 border-green-400  rounded-lg w-[20rem] min-h-[20rem] md:w-[22rem]">
          {loading && <Spinner />}
          <h1 className="text-center  text-3xl text-green-400 m-10">Login</h1>
          <form
            action=""
            className="flex flex-col gap-3 justify-center items-center"
          >
            <div className="flex justify-around items-center w-full">
              <label className="text-sm">Email : </label>
              <input
                type="email"
                name="email"
                className=" rounded w-56 bg-[#23253a] border border-green-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className="flex justify-around items-center w-full">
              <label className="text-sm">Password :</label>
              <input
                type="password"
                name="password"
                className="rounded w-56 bg-[#23253a] border border-green-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <Link to="/register" className=" text-blue-800">
              Don't have an account ? Click here to signup
            </Link>
            <input
              type="submit"
              value="Login"
              className=" bg-green-400 w-20 h-10 rounded-md hover:bg-opacity-30"
              onClick={submitHandler}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
