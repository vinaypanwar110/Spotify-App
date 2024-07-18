
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { assets } from "../assets/assets";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex flex-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <button
              className="bg-black text-white py-1 px-3 rounded-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl">All</p>
        <p className="bg-black px-4 py-1 rounded-2xl">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl">Podcasts</p>
      </div>
    </>
  );
};

export default Navbar;
