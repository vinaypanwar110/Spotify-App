// import React, { useEffect } from "react";
// import { useRef } from "react";
// import { useContext } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import DisplayHome from "./DisplayHome";
// import DisplayAlbum from "./DisplayAlbum";
// import { PlayerContext } from "../contexts/PlayerContext";
// import Login from "./Login";
// import Signup from "./Signup";
// const Display = () => {
//   const { albumsData } = useContext(PlayerContext);
//   const  displayRef = useRef();
//   const location = useLocation();
//   const isAlbum = location.pathname.includes("album");
//   const albumId = isAlbum ? location.pathname.split('/').pop() : "";
//   const bgColor = isAlbum && albumsData.length>0
//     ? albumsData.find((x) => (x._id == albumId)).bgColour
//     : "#121212";
//   useEffect(() => {
//     if (isAlbum) {
//       displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
//     } else {
//       displayRef.current.style.background = `#121212`;
//     }
//   });

//   return (
//     <div
//       ref={displayRef}
//       className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
//     >
//        {albumsData.length > 0 ?
//        <Routes>
//         <Route path="/" element={<DisplayHome />}></Route>
//         <Route
//           path="/album/:id"
//           element={
//             <DisplayAlbum
//               album={albumsData.find((x) => (x._id == albumId))}
//             />
//           }
//         >

//         </Route>

//       </Routes> :
//       null
//       }

//     </div>
//   );
// };

// export default Display;

import React, { useEffect, useRef, useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../contexts/PlayerContext";
import { AuthContext } from "../contexts/AuthContext";
import MusicPage from "./MusicPage";
import Podcast from "./Podcast";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const { user } = useContext(AuthContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId)?.bgColour
      : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route
            path="/"
            element={user ?  <DisplayHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />
            }
          />
         
        </Routes>
      ) : null}

            <Routes>
       <Route path="/music" element={<MusicPage />} />
       <Route path="/podcasts" element={<Podcast/>} />
       </Routes>
    </div>
  );
};

export default Display;
