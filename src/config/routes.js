/*
Name: Adebayo Onifade
Date: 6/10/2022
File: routes.js
Description: create application routes
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "../components/Body";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Search from "../pages/search/search";
import Artists from "../pages/artist/artists";
import Artist from "../pages/artist/artist";
import { Albums, AlbumsByArtist } from "../pages/album/albums";
import Signin from "../pages/auth/signin";
import Signout from "../pages/auth/signout";
import Signup from "../pages/auth/signup";
import { AlbumByArtist } from "../pages/album/album";
import { Tracks, TracksByAlbum } from "../pages/track/tracks";

import { AuthProvider } from "../services/useAuth";
import RequireAuth from "../components/RequireAuth";
import { useState } from "react";

const AppRoutes = () => {
  const [curPlaying, setCurplaying] = useState(null);
  const [activeSong, setActiveSong] = useState(null);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Body
                curPlaying={curPlaying}
                setCurplaying={setCurplaying}
                activeSong={activeSong}
                setActiveSong={setActiveSong}
              />
            }
          >
            <Route index element={<Home />} />
            <Route index element={<Search />} />
            <Route
              path="artists"
              element={
                <RequireAuth>
                  <Artists />
                </RequireAuth>
              }
            >
              <Route
                path=":artistId"
                element={
                  <Artist
                    setCurplaying={setCurplaying}
                    setActiveSong={setActiveSong}
                    activeSong={activeSong}
                    curPlaying={curPlaying}
                  />
                }
              >
                <Route path="albums" element={<AlbumsByArtist />}>
                  <Route
                    path=":albumId"
                    element={
                      <AlbumByArtist
                        setCurplaying={setCurplaying}
                        setActiveSong={setActiveSong}
                        activeSong={activeSong}
                       
                      />
                    }
                  />
                </Route>
                <Route path="tracks" element={<TracksByAlbum />}></Route>
              </Route>
            </Route>
            <Route
              path="albums"
              element={
                <RequireAuth>
                  <Albums />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="tracks"
              element={
                <RequireAuth>
                  <Tracks />
                </RequireAuth>
              }
            ></Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
