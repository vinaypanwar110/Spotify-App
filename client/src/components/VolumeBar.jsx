

import React, { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { assets } from "../assets/assets";

const VolumeBar = () => {
  const { volume, setVolume } = useContext(PlayerContext);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);
  };

  return (
    <div className="flex items-center gap-2">
      <img className="w-5" src={assets.volume_icon} alt="Volume Icon" />
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
        className="w-120 bg-gray-300 rounded"
      />
    </div>
  );
};

export default VolumeBar;
