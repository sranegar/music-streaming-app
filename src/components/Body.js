/*
Name: Adebayo Onifade
Date: 6/10/2022
File: Body.js
Description: create the page body
*/

import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Body = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Body;