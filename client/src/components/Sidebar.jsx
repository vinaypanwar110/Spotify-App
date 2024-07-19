import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { url } from "../../../spotify-admin/src/App";
import axios from "axios";
import { PlayerContext } from "../contexts/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const {playWithId} = useContext(PlayerContext);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`${url}/api/like/list`);
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.likes);
      } else {
        toast.error("Error occur while listing likes");
      }
    } catch (error) {
      toast.error("Error occur while listing likes");
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-3 pl-8 cursor-pointer "
        >
          <img className="w-6" src={assets.home_icon} alt=""></img>
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer ">
          <img className="w-6" src={assets.search_icon} alt=""></img>
          <p className="font-bold">Search</p>
        </div>
      </div>





      
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={assets.stack_icon} className="w-8" />
            <p className="font-semibold">You Liked</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>

<div className="overflow-y-auto h-[calc(100%-4rem)]">
          {data.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {/* Header Row */}
              <div className="flex p-4 bg-[#1f1f1f]">
                <div className="w-[50%]">
                  <p className="font-semibold">Song</p>
                </div>
                <div className="w-[50%]">
                  <p className="font-semibold">Album</p>
                </div>
              </div>

              {/* Data Rows */}
               {data.map((item, index) => (
                <div onClick={() => playWithId(item._id)} key={index} className="flex p-4 hover:bg-gray-600 cursor-pointer">
                  <div className="w-[50%]">{item.name}</div>
                  <div className="w-[50%]">{item.album}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-2">No Likes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
