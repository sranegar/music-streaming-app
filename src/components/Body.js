/*
Name: Adebayo Onifade
Date: 6/10/2022
File: Body.js
Description: create the page body
*/

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import MusicPlayer from "./MusicPlayer";

const Body = ({
  curPlaying,
  setCurplaying,
  activeSong,
  setActiveSong,
  pause,
  setPause,
  pauseSong,
  playSong,
  handleOnPause,
  handleOnPlay,
  curArtist,
  curProgress,
  setCurProgress,
  progress,
  audio,
}) => {
  return (
    <>
      <Header />
      <Outlet
        curPlaying={curPlaying}
        setCurplaying={setCurplaying}
        activeSong={activeSong}
        setActiveSong={setActiveSong}
        pauseSong={pauseSong}
        audio={audio}
      />
      <MusicPlayer
        curPlaying={curPlaying}
        setCurplaying={setCurplaying}
        activeSong={activeSong}
        setActiveSong={setActiveSong}
        pause={pause}
        setPause={setPause}
        pauseSong={pauseSong}
        playSong={playSong}
        handleOnPause={handleOnPause}
        handleOnPlay={handleOnPlay}
        curArtist={curArtist}
        curProgress={curProgress}
        setCurProgress={setCurProgress}
        audio={audio}
      />
    </>
  );
};

export default Body;
