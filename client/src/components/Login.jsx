import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { URL } from '../App';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const {login,user} = useContext(AuthContext);

  const navigate = useNavigate();


  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //     toast.success("Login successful!");
  //   }
  // }, [user, navigate]);


  const handleLogin = async (e) => {
      e.preventDefault();
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found. Please sign up.");
          setTimeout(() => {
            navigate("/signup");
          }, 3000); // Wait 3 seconds before redirecting
        } else if (error.response.status === 400) {
          toast.error("Incorrect password. Please try again.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Error in login: " + error.response.data.message);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up login request:", error.message);
      }
    }
  }
  







  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="username">
            Username
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
          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
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
          Login
        </button>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <span
            className="text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );

}

export default Login