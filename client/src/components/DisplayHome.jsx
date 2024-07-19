// import React from "react";
// import Navbar from "./Navbar";
// import AlbumItem from "./AlbumItem";
// import SongItem from "./SongItem";
// import { useContext } from "react";
// import { PlayerContext } from "../contexts/PlayerContext";
// const DisplayHome = () => {

//   const {songsData,albumsData} = useContext(PlayerContext);

//   return (
//     <>
    
//       <Navbar />
//       <div className="mb-4">
//         <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
//         <div className="flex overflow-auto">
//           {albumsData.map((item, index) => {
//             return (
//               <AlbumItem
//                 key={index}
//                 name={item.name}
//                 desc={item.desc}
//                 id={item._id}
//                 image={item.image}
//               />
//             );
//           })}
//         </div>
//       </div>

//       <div className="mb-4">
//         <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
//         <div className="flex overflow-auto">
//           {songsData.map((item, index) => {
//             return (
//               <SongItem
//                 key={index}
//                 name={item.name}
//                 desc={item.desc}
//                 id={item._id}
//                 image={item.image}
//               ></SongItem>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DisplayHome;


import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { useContext, useRef } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const albumContainerRef = useRef(null);
  const songContainerRef = useRef(null);

  const scroll = (ref, direction) => {
    if (direction === 'left') {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            onClick={() => scroll(albumContainerRef, 'left')}
            style={{fontSize:'24px'}}
          >
           &#8592;
          </button>
          <div className="flex overflow-x-auto" ref={albumContainerRef}>
            {albumsData.map((item, index) => {
              return (
                <AlbumItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              );
            })}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            onClick={() => scroll(albumContainerRef, 'right')}
            style={{fontSize:'24px'}}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            onClick={() => scroll(songContainerRef, 'left')}
            style={{fontSize:'24px'}}
          >
            &#8592;
          </button>
          <div className="flex overflow-x-auto" ref={songContainerRef}>
            {songsData.map((item, index) => {
              return (
                <SongItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                ></SongItem>
              );
            })}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            onClick={() => scroll(songContainerRef, 'right')}
            style={{fontSize:'24px'}}
          >
            &#8594;
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
