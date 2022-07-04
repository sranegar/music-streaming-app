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
 

const Body = ({curPlaying, setCurplaying}) => {

  console.log(curPlaying)
    return (
      <>
        <Header curPlaying={curPlaying} />
        <Outlet curPlaying={curPlaying} setCurplaying={setCurplaying} />
        <Footer />
      </>
    );
};

export default Body;