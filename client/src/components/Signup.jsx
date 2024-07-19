import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Signup = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(`${URL}/auth/signup`, {
    //     username,
    //     password,
    //   });
    //   console.log(response);
    //   if (response.status === 201) {
    //     navigate("/login");
    //   } 
    //   else if(response.status===400){
    //     console.log("Error in signup:", response.data.message);
    //   }
    //   else {
    //     console.log("Error in signup:", response.data.message);
    //   }
    // } catch (error) {
    //   console.error("Error in signup:", error.message);
    // }

    try {
      const response = await axios.post(`${URL}/auth/signup`, {
        username,
        password,
      });
      console.log("Signup response:", response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("User already exists. Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 1000); // Wait 3 seconds before redirecting
        } else {
          toast.error("Error in signup: " + error.response.data.message);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up signup request:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-300"
            htmlFor="username"
          >
            username
          </label>
          <input
            type="string"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
