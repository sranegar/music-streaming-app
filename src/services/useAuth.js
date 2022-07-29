import { useState, createContext, useContext } from "react";
import { settings } from "../config/config";

// Create the context
const AuthContext = createContext(null);

const AuthProvider = ({
  children,
  pauseSong,
  setCurplaying,
  setCurartist,
  setActiveSong,
  setPause,
  setAlbumImage,
}) => {
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
          first_name: result.first_name,
          last_name: result.last_name,
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
    setCurplaying(null);
    setCurartist(null);
    setActiveSong(null);
    pauseSong();
    setAlbumImage('');
    
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
        setUser({
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          role: result.data.role,
          username: result.data.username,
        });
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
