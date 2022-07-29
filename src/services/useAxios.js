import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { settings } from "../config/config";

const UseAxios = (url, method = "GET", headers = {}, body = {}) => {
  headers = {
    ...{ "Content-Type": "application/json" },
    ...headers,
  };
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseURI = settings.baseApiUrl + "/artists";
  //Abort controller to abort a request if it failed
  const controller = new AbortController();
  const signal = controller.signal;

  //useEffect function
  useEffect(() => {
    axios({
      url: url,
      method: method,
      headers: headers,
      data: body,
      timeout: 2000,
      signal: signal,
    })
      .then((response) => {
        setIsLoading(false);
        setError(null);
        setData(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          setError(error.request);
        } else {
          setError("Error: ", error.message);
        }
      });
  }, [url]);

  // Search
    const search = (query) => {
      const url = baseURI + "?q=" + query;
      axios.get(url, {
        
          signal: new AbortController().signal,
      });
      
  };

  return { data, isLoading, error, search };
};

export default UseAxios;
