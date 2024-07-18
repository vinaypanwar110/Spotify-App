import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { URL } from '../App';


const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        console.log(username);
        console.log(password);
        const response = await axios.post(`${URL}/api/auth/login`, {
            username,
            password
        });
        console.log(response);
        if (response.status === 200) {
            login(response.data.token);
            navigate('/');
        } 
        else {
            console.log("Error in login:", response.data.message);
        }
    } 
    catch (error) {
        console.error("Error in login:", error.message);
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