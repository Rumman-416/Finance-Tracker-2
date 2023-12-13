import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`http://localhost:8080/users/register`, {
        name,
        email,
        password,
      });
      window.alert(`Successfully registered`);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      window.alert(`Failed to register`);
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
        <div className="   border-2 border-green-400  rounded-lg w-11/12 min-h-[20rem]">
          {loading && <Spinner />}
          <h1 className="text-center  text-3xl text-green-400 m-10">Signup</h1>
          <form
            action=""
            className="flex flex-col gap-3 justify-center items-center"
          >
            <span className="flex justify-around items-center w-full">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                className=" rounded w-56 bg-[#23253a] border border-green-400"
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span className="flex justify-around items-center w-full">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className=" rounded w-56 bg-[#23253a] border border-green-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
            <span className="flex justify-around items-center w-full">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className=" rounded w-56 bg-[#23253a] border border-green-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <Link to="/login" className=" text-blue-400">
              Already have an account ? Click here to login
            </Link>
            <input
              type="submit"
              value="Register"
              className=" bg-green-400 w-20 h-10 rounded-md hover:bg-opacity-30"
              onClick={submitHandler}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
