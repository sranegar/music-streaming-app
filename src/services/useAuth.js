/*
Name: Stephanie Ranegar
Date: 06/11/2022
File: userAuth.js
Description: This script creates a React hook for user authentication. It uses useContext to manage state
 */

//The code was adopted from https://www.jeffedmondson.dev/blog/react-protected-routes/
import { useState, createContext, useContext } from "react";
import { settings } from "../config/config";

// Create the context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  //login function
  const login = (account, callback) => {
    const url = settings.baseApiUrl + "/users/authJWT";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setIsAuthed(true);
        setUser({
          name: result.name,
          role: result.role,
          username: result.username,
          jwt: result.jwt,
        });
        callback();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        if (err.status == 401) {
          setError("Incorrect username/password. Please try again.");
        } else {
          setError("An error has occurred. Please try again.");
        }
      });
  };

  //logout function
  const logout = () => {
    setError(null);
    setIsLoading(false);
    setIsAuthed(false);
    setIsSignup(false);
    setUser(null);
  };

  //signup function
  const signup = (account) => {
    const url = settings.baseApiUrl + "/users";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setUser({ name: result.data.name, role: result.data.role });
        setIsSignup(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError("An error has occurred. Please try again.");
      });
  };

  return (
    // Create the provider so that any component in our application can
    // use the values that we are sending.
    <AuthContext.Provider
      value={{
        error,
        isLoading,
        isAuthed,
        isSignup,
        user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
