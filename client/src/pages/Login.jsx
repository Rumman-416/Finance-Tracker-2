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
      navigate("/");
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
        <div className="login-box bg-green-400 bg-opacity-20 border-2 rounded-lg">
          {loading && <Spinner />}
          <h1 className="text-center mb-5 mt-5 text-3xl text-green-400">Login</h1>
          <form
            action=""
            className="flex flex-col gap-3 justify-center items-center"
          >
            <span className="mb-3">
              <label className="text-xl">Email : </label>
              <input
                type="email"
                name="email"
                className="border-2 ml-10 rounded"
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
            <span className="flex gap-3 m-3">
              <label className="text-xl">Password :</label>
              <input
                type="password"
                name="password"
                className="rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <Link to="/register" className=" text-blue-800">
              {/*Don't have an account ? Click here to signup*/}
            </Link>
            <input
              type="submit"
              value="Login"
              className="border-2 bg-slate-500 mb-5 w-20 justify-center"
              onClick={submitHandler}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
