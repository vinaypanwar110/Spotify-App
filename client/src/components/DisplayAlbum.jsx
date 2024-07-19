import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../contexts/PlayerContext";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const [likedSongs, setLikedSongs] = useState(new Set());
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`${URL}/like/list`);
      if (response.data.success) {
        setLikedSongs(response.data.likes);
      } else {
        toast.error("Error occur while listing likes");
      }
    } catch (error) {
      toast.error("Error occur while listing likes");
    }
  };

  useEffect(() => {
    // Fetch album data based on ID
    const selectedAlbum = albumsData.find(item => item._id === id);
    if (selectedAlbum) {
      setAlbumData(selectedAlbum);
    }
  }, [id, albumsData]);

  useEffect(() => {
    fetchLikes
  }, []);

  const addtoDatabase = async (songId) => {
    try {
      // Find the song details from songsData
      const selectedSong = songsData.find(item => item._id === songId);
      if (!selectedSong) {
        throw new Error("Song not found");
      }

      const response = await axios.post(`${URL}/like/add`, {
        name: selectedSong.name,
        album: selectedSong.album
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success("Song liked");
        setLikedSongs(prevLikedSongs => new Set([...prevLikedSongs, songId]));
      } 
      else {
        toast.error("Failed to like the song");
      }
    } catch (error) {
      console.error("Error liking song:", error);
      toast.error("Error occurred while liking the song");
    }
  };

  const removeFromDatabase = async (songId) => {
    try {
      const response = await axios.post(`${URL}/like/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } 
    catch (error) {
      toast.error("Error while unliking");
    }
  };

  const handleLikeToggle = async (songId) => {
    try {
      if (likedSongs.has(songId)) {
        await removeFromDatabase(songId);
        setLikedSongs(prevLikedSongs => {
          const updatedLikedSongs = new Set(prevLikedSongs);
          updatedLikedSongs.delete(songId);
          return updatedLikedSongs;
        });
      } else {
        await addtoDatabase(songId);
        setLikedSongs(prevLikedSongs => new Set([...prevLikedSongs, songId]));
        
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Error occurred while toggling like");
    }
  };

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b>Spotify </b>
            &#8226;1,222,335,889 &#8226; <b>50 songs,</b> about 2 hr 30 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
        <p>Liked</p>
      </div>
      <hr />
      {songsData
        .filter((item) => item.album === albumData.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLikeToggle(item._id);
              }}
              className={`w-6 h-6 ${
                likedSongs.has(item._id) ? "text-red-500" : "text-gray-500"
              }`}
            >
              {likedSongs.has(item._id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
