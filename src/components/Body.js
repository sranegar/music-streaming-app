/*
Name: Adebayo Onifade
Date: 6/10/2022
File: Body.js
Description: create the page body
*/

import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import MusicPlayer from "./MusicPlayer";
 

const Body = ({curPlaying, setCurplaying}) => {

    return (
      <>
        <Header />
        <Outlet curPlaying={curPlaying} setCurplaying={setCurplaying} />
        <MusicPlayer curPlaying={curPlaying} />
        <Footer />
      </>
    );
};

export default Body;