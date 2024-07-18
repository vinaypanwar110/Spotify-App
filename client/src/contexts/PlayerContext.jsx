import { createContext, useEffect, useState } from "react";
import { useRef } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url ='http://localhost:4000';

  const [songsData,setSongsData] = useState([]);
  const [albumsData,setAlbumsData] = useState([]);

  const [volume, setVolume] = useState(0.5); // default volume




  const [track, setTrack] = useState(songsData[1]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);



  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    // await setTrack(songsData[id]);
    // await audioRef.current.play();
    // setPlayStatus(true);
    await songsData.map((item)=>{
      if(id==item._id){
        setTrack(item);
      }
    })

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    // if (track.id > 0) {
    //   await setTrack(songsData[track.id - 1]);
    //   await audioRef.current.play();
    //   setPlayStatus(true);
    // }
    songsData.map(async(item,index)=>{
           if(track._id===item._id&&index>0){
               await setTrack(songsData[index-1]);
               await audioRef.current.play();
               setPlayStatus(true);
           }
    })
  };
  const next = async () => {
    songsData.map(async(item,index)=>{
      if(track._id===item._id&&index<songsData.length){
          await setTrack(songsData[index+1]);
          await audioRef.current.play();
          setPlayStatus(true);
      }
     else if(track._id===item._id&&index>=songsData.length){
        index = 0;
        await setTrack(songsData[0]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
})
  };
  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]); 
    } catch (error) {
      toast.error("Error while getSongsData");  
    }
  }

  const getAlbumsData = async () => {
      try {
        const response  = await axios.get(`${url}/api/album/list`);
        setAlbumsData(response.data.albums);
      } catch (error) {
        toast.error("Error while getAlbumData");
      }
  }
  
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  useEffect(()=>{
      getSongsData();
      getAlbumsData(); 
  },[])

  const adjustVolume = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };


  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    volume,
    setVolume: adjustVolume,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
