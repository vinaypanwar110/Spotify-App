import React, { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/song/list`);
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.songs || []);
      }
    } catch (error) {
      toast.error("Error occured // while listing data");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error while deleting song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img
                src={item.image}
                className="w-12"
                alt={`${item.name} cover`}
              />
              <p>{item.name}</p>
              <p>{item.album}</p>
              
              <p>{item.duration}</p>
              <button
                onClick={() => removeSong(item._id)}
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Delete
              </button>
              {/* <p
                className="cursor-pointer"
                onClick={() => removeSong(item._id)}
              >
                <b>X</b>
              </p> */}
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
