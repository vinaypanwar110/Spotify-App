import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import PlayerContextProvider, { PlayerContext } from "./contexts/PlayerContext";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
export const URL = "http://localhost:4000";

import { Route, Routes, useLocation } from "react-router-dom";
import MusicPage from "./components/MusicPage";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <AuthProvider>
      <div className="h-screen bg-black">
        <ToastContainer />

        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>
        {songsData.length !== 0? (
          <>
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
            </div>
            <Player />
          </>
        ) : null}
        <audio
          ref={audioRef}
          src={track ? track.file : ""}
          preload="auto"
        ></audio>
      </div>
    </AuthProvider>
  );
};

export default App;

