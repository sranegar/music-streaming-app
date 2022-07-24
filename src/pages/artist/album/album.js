/*
Name: Stephanie Ranegar
Date: 6/12/2022
File: album.js
Description: Create a component to display album details
*/

import React from "react";
import { settings } from "../../../config/config";
import {
  Grid,
  Header,
  Image,
  Loader,
  Dimmer,
  Segment,
  List,
  Divider,
  Container,
  Icon,
  Modal,
} from "semantic-ui-react";
import "./album.css";
import useXmlHttp from "../../../services/useXmlHttp";
import {
  useParams,
  useOutletContext,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../services/useAuth";

const AlbumByArtist = ({
  setCurplaying,
  activeSong,
  setActiveSong,
  setPause,
  pause,
  pauseSong,
  playSong,
  setCurartist,
  setAlbum,
  setAlbumImage,
}) => {
  const { user } = useAuth();
  const [albumById, setAlbumById] = useState(false);

  let navigate = useNavigate();
  const [subHeading, setSubHeading] = useOutletContext();
  const { artistId, albumId } = useParams();
  const url = settings.baseApiUrl + "/albums/" + albumId;
  const {
    error,
    isLoading,
    setData,
    data: album,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });

  function handleOnClick() {
    if (subHeading === "All Albums") {
      navigate(`/artists/${artistId}`);
    } else navigate(`/artists/${artistId}/albums`);
  }
 


  return (
    <Grid stackable columns={3} style={{ paddingTop: "0px" }}>
      {error && <div>{error}</div>}

      {isLoading && (
        <Container style={{ backgroundColor: "#040404" }}>
          <Dimmer page active>
            <Loader
              inline="centered"
              size="big"
              inverted
              active
              content="Loading"
            />
          </Dimmer>
        </Container>
      )}

      {album && (
        <Grid.Row
          style={{ padding: "0px 40px 10px" }}
          className="album-view-row"
        >
          {setSubHeading(album.title)}
          <Grid.Column
            className='x-mark'
            width={16}
            textAlign="right"
            style={{ padding: "0px 40px", margin: "0px" }}
          >
            <FontAwesomeIcon
              icon={faSquareXmark}
              className='fa-x'
              size="2xl"
              onClick={handleOnClick}
              style={{
                cursor: "pointer",
                color: "#E2E1E3D6",
                padding: "10px 0px",
              }}
            />
          </Grid.Column>
          <Grid.Column width={6} style={{ overflow: "hidden" }}>
            <Image centered size="massive" src={album.image} alt={album.name} />
          </Grid.Column>
          <Grid.Column width={10} className="album-track-list">
            <Segment basic className="track-list-container">
              <Header inverted as="h2" style={{ color: "#E2E1E3D6" }}>
                {album.title}
              </Header>
              <Grid doubling columns={3}>
                {album.artists.map((artist, index) => (
                  <Grid.Column key={index}>
                    <Header as="h6">
                      {artist.name}
                      <span style={{ padding: "0px 8px" }}>|</span>
                      {album.year_released}
                    </Header>
                  </Grid.Column>
                ))}
              </Grid>

              {album.tracks.length === 0 ? (
                <Header inverted as="h5">
                  No tracks available at this time.
                </Header>
              ) : (
                <List
                  size="small"
                  inverted
                  celled
                  ordered
                  style={{ color: "#f8f8f8db", padding: "20px 10px" }}
                >
                  {album.tracks.map((track, index) => (
                    <List.Item
                      className="track-list-item"
                      key={index}
                      style={
                        activeSong === track.title && !pause
                          ? {
                              padding: "8px",
                              backgroundColor: "#0b0b0b",
                              color: "#fff",
                            }
                          : { padding: "8px" }
                      }
                      onClick={() => {
                        setAlbum(album.title);
                        setAlbumImage(album.image);
                        setCurplaying(track.mp3file);
                        setActiveSong(track.title);
                        setPause(false);
                        {
                          album.artists.map((a) => setCurartist(a.name));
                        }
                      }}
                    >
                      {activeSong === track.title && !pause ? (
                        <List.Content
                          style={{
                            paddingLeft: "10px",
                          }}
                          onClick={pauseSong}
                        >
                          {track.title}
                        </List.Content>
                      ) : (
                        <List.Content
                          style={{
                            paddingLeft: "10px",
                          }}
                          onClick={playSong}
                        >
                          {track.title}
                        </List.Content>
                      )}
                    </List.Item>
                  ))}
                </List>
              )}
            </Segment>
          </Grid.Column>
          <Grid.Row></Grid.Row>
        </Grid.Row>
      )}
    </Grid>
  );
};

export { AlbumByArtist };
