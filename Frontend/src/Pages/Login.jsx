import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add Firebase or API logic here
    const { email, password } = loginData;
    const userData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        userData
      );
      console.log("response", response);
      navigate("/blogs");
    } catch (error) {
      if (error.response.data.msg) {
        seterror(error.response.data.msg);
      }
      console.log("error from signup page", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <p className="text-red-400 text-sm text-center w-full pb-4">
          {error ? error : ""}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className="text-sm text-TextGray mt-1 text-center">
            Already have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 hover:underline"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
