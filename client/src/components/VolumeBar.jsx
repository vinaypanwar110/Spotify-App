// import React from 'react';
// import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

// const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
//   <div className="hidden lg:flex flex-1 items-center justify-end">
//     {value <= 1 && value > 0.5 && <BsFillVolumeUpFill size={25} color="#FFF" onClick={() => setVolume(0)} />}
//     {value <= 0.5 && value > 0 && <BsVolumeDownFill size={25} color="#FFF" onClick={() => setVolume(0)} />}
//     {value === 0 && <BsFillVolumeMuteFill size={25} color="#FFF" onClick={() => setVolume(1)} />}
//     <input
//       type="range"
//       step="any"
//       value={value}
//       min={min}
//       max={max}
//       onChange={onChange}
//       className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
//     />
//   </div>
// );

// export default VolumeBar;

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
