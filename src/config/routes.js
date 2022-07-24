import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "../components/Body";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Artists from "../pages/artist/artists";
import Artist from "../pages/artist/artist";
import { Albums, AlbumsByArtist } from "../pages/artist/album/albums";
import Signin from "../pages/auth/signin";
import Signout from "../pages/auth/signout";
import Signup from "../pages/auth/signup";
import { AlbumByArtist } from "../pages/artist/album/album";

import { AuthProvider } from "../services/useAuth";
import RequireAuth from "../components/RequireAuth";
import { useState } from "react";

const AppRoutes = () => {
  const [curPlaying, setCurplaying] = useState(null);
  const [activeSong, setActiveSong] = useState(null);
  const [curArtist, setCurartist] = useState(null);
  const [pause, setPause] = useState(true);
  const [curProgress, setCurProgress] = useState(0);
  const [album, setAlbum] = useState(null);
  const [albumImage, setAlbumImage] = useState('');
  const audio = document.getElementById("audio");
 
  
  const pauseSong = () => {
    setPause(true);
    clearInterval(curPlaying)
    audio.pause();
  };

  const playSong = () => {
 
    setPause(false);
    audio.play();
  };

  function handleOnPause() {
    setPause(true);
   
  }

 
  return (
    <BrowserRouter>
      <AuthProvider
        pauseSong={pauseSong}
        setPause={setPause}
        setCurplaying={setCurplaying}
        setActiveSong={setActiveSong}
        setCurartist={setCurartist}
        setAlbumImage={setAlbumImage}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Body
                curPlaying={curPlaying}
                setCurplaying={setCurplaying}
                activeSong={activeSong}
                setActiveSong={setActiveSong}
                pause={pause}
                setPause={setPause}
                pauseSong={pauseSong}
                handleOnPause={handleOnPause}
                playSong={playSong}
                curArtist={curArtist}
                setCurProgress={setCurProgress}
                curProgress={curProgress}
                audio={audio}
                setAlbum={setAlbum}
                setAlbumImage={setAlbumImage}
                albumImage={albumImage}
              />
            }
          >
            <Route index element={<Home />} />
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
                    pause={pause}
                    setPause={setPause}
                    pauseSong={pauseSong}
                    playSong={playSong}
                    setCurartist={setCurartist}
                    audio={audio}
                    setAlbumImage={setAlbumImage}
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
                        setPause={setPause}
                        pause={pause}
                        pauseSong={pauseSong}
                        playSong={playSong}
                        setCurartist={setCurartist}
                        audio={audio}
                        setAlbum={setAlbum}
                        setAlbumImage={setAlbumImage}
                      />
                    }
                  />
                </Route>
              </Route>
            </Route>

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
