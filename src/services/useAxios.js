/*
Name: Adebayo Onifade
Date: 6/16/2022
File: useAxios.js
Description: Create a service for using axios object
*/

import axios from 'axios';
import {useState, useEffect} from 'react';
import {useAuth} from "./useAuth";
import {settings} from "../config/config";

const UseAxios = (url,
                  method = "GET",
                  headers = {},
                  body = {}) => {
    headers = {
        ...{"Content-Type": "application/json"},
        ...headers
    };
    const {user} = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const baseURI = settings.baseApiUrl + '/tracks';
    //Abort controller to abort a request if it failed
    const abortCont = new AbortController();
    const signal = abortCont.signal;

    console.log(data);

    //useEffect function
    useEffect(() => {
      axios({
            url: url,
            method: method,
            headers: headers,
            data: body,
            timeout: 2000
        })
            .then(response => {
                setIsLoading(false);
                setError(null);
                setData(response.data);
            })
            .catch(error => {
                setIsLoading(false);
                if(error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setError(error.response)
                } else if (error.request) {
                    // The request was made but no response was received
                    setError(error.request)
                } else {
                    setError("Error: ", error.message)
                }
            });
    }, [url]);

    // Get all
    const getAll = (id = null) => {
        setIsLoading(true);
        const url = (!id) ? baseURI : baseURI + "/" + id;
        axios(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + user.jwt
            },
            signal: signal
        });

    }

    //Get a specific
    const get = ($id) => {
        getAll($id);
    }

    // Search
    const search = (query) => {
        axios(baseURI + "?q=" + query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + user.jwt
            },
            signal: signal
        });

    }

    return {data, isLoading, error, get, getAll, search};
};

export default UseAxios;