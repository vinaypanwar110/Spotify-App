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
export const URL = 'http://localhost:4000';


import { Route, Routes, useLocation } from "react-router-dom";

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

        {songsData.length !== 0 ? (
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



// import React, { useContext, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Player from "./components/Player";
// import Display from "./components/Display";
// import PlayerContextProvider, { PlayerContext } from "./contexts/PlayerContext";
// import { AuthProvider, AuthContext } from "./contexts/AuthContext";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// export const URL = 'http://localhost:4000';

// const App = () => {
//   return (
//     <AuthProvider>
//       <PlayerContextProvider>
//         <Router>
//           <div className="h-screen bg-black">
//             <ToastContainer />
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/*" element={<ProtectedRoutes />} />
//             </Routes>
//           </div>
//         </Router>
//       </PlayerContextProvider>
//     </AuthProvider>
//   );
// };

// const ProtectedRoutes = () => {
//   const { user } = useContext(AuthContext);
//   const { audioRef, track, songsData } = useContext(PlayerContext);

//   useEffect(() => {
//     if (!user) {
//       toast.error("You need to log in to access the player.");
//     }
//   }, [user]);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <>
//       {songsData.length !== 0 ? (
//         <>
//           <div className="h-[90%] flex">
//             <Sidebar />
//             <Display />
//           </div>
//           <Player />
//         </>
//       ) : null}

//       <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
//     </>
//   );
// };

// export default App;
