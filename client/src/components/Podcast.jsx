import React from "react";
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Podcast = () => {
  const { songsData, playWithId } = useContext(PlayerContext);
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col">
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

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className=" text-2xl font-bold mb-4 text-white">Podcasts</h2>
          <div className="flex flex-col gap-4">
            {songsData.map((song) => (
              <div
                key={song._id}
                className="bg-gray-800 p-2 rounded-lg shadow cursor-pointer hover:bg-black"
                onClick={() => playWithId(song._id)}
              >
                <h3 className="text-xl font-semibold text-green-600">
                  {song.name}
                </h3>
                <p className=" text-white">{song.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
