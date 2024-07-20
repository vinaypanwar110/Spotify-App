import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { URL } from "../App";
import axios from "axios";
import { PlayerContext } from "../contexts/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const {playWithId,playByName,searchQuery,setSearchQuery,removeFromLikes} = useContext(PlayerContext);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`${URL}/like/list`);
      if (response.data.success) {
        setData(response.data.likes);
      } else {
        toast.error("Error occur while listing likes");
      }
    } catch (error) {
      toast.error("Error occur while listing likes");
    }
  };

  const handleSearch = async () => {
    try {
      await playByName(searchQuery);
    } catch (error) {
      toast.error("Error while searching for the song");
    }
  };


  const handleRemove = async (songId) => {
    try {
      await removeFromLikes(songId);
      setData(prevData => prevData.filter(item => item._id !== songId));
    } catch (error) {
      toast.error("Error while removing the song");
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-10" src={assets.home_icon} alt="Home" />
          <p className="text-2xl font-bold">Home</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search songs..."
          className="p-2 bg-gray-800 rounded text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-green-500 rounded text-white"
          aria-label="Search for a song"
        >
          Search
        </button>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={assets.stack_icon} className="w-8" alt="Likes" />
            <p className="font-semibold">You Liked</p>
          </div>
          
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {data.length > 0 ? (
            <div className="divide-y divide-gray-700">
              <div className="flex p-4 bg-[#1f1f1f]">
                <div className="w-[50%]">
                  <p className="font-semibold">Song</p>
                </div>
                <div className="w-[30%]">
                  <p className="font-semibold">Album</p>
                </div>
                <div className="w-[20%] flex justify-end">
                  <p className="font-semibold">Actions</p>
                </div>
              </div>

              {data.map((item, index) => (
                <div onClick={() => playByName(item.name)}
                  key={index}
                  className="flex p-4 hover:bg-gray-600 cursor-pointer"
                >
                  <div className="w-[50%]">{item.name}</div>
                  <div className="w-[30%]">{item.album}</div>
                  <div className="w-[20%] flex justify-end">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
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