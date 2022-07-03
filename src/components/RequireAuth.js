/*
Name: Adebayo Onifade
Date: 6/10/2022
File: RequiredAuth.js
Description: This script creates a component to protect pages
*/


import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../services/useAuth";


const RequireAuth = ({children}) => {
    let {isAuthed} = useAuth();
    let location = useLocation();
    if (!isAuthed) {
        return <Navigate to="/signin" state={{from: location}} replace/>;
    }

    return children;
};

export default RequireAuth;