/*
Name: Adebayo Onifade
Date: 6/10/2022
File: tracks.js
Description: Create a component to list all the tracks by an artist
*/

import { settings } from "../../config/config";
import useXmlHttp from "../../services/useXmlHttp";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../services/useAxios";
import Paginate from "./pagination";
import "./tracks.css";
import {
  Grid,
  Segment,
  Header,
  Image,
  Loader,
  Dimmer,
  Container,
  Divider,
  Table,
  List,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlayCircle,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../services/useAuth";
import React, { useState, useEffect } from "react";

const Tracks = () => {
  const [subHeading, setSubHeading] = useState("All Tracks");
  const [url, setUrl] = useState(settings.baseApiUrl + "/tracks");
  const { pathname } = useLocation();
  const { user } = useAuth();

  //declare the data fetching function
  const {
    error,
    isLoading,
    data: tracks,
    getAll,
    search,
  } = useAxios(url, "GET", { Authorization: "Bearer " + user.jwt });

  useEffect(() => {
    getAll();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = document.getElementById("track-search-term").value;
    if (term == "") setSubHeading("All Albums");
    else if (isNaN(term))
      setSubHeading("Albums containing term '" + term + "'");
    search(term);
  };

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("track-search-term").value = "";
    search("");
  };

  console.log(tracks);
  return (
    <Grid columns={1} centered padded style={{ padding: "0px 5px" }}>
      <Grid.Row columns={1}>
        <Outlet context={[subHeading, setSubHeading]} />
      </Grid.Row>
      <Grid.Column>
        <Header as="h3" inverted style={{ paddingLeft: "26px" }}>
          Albums <span>/ {subHeading}</span>
        </Header>
      </Grid.Column>

      {error && <div>{error}</div>}

      {isLoading && (
        <Dimmer page active>
          <Loader
            inline="centered"
            size="huge"
            inverted
            active
            content="Loading"
          />
        </Dimmer>
      )}
      {tracks && (
        <Grid style={{ minHeight: "100vh" }} stackable columns={1}>
          <Divider />
          {tracks && <Paginate tracks={tracks} setUrl={setUrl} />}
          <Container style={{ padding: "14px 0px 20px" }}>
            <Table
              unstackable
              size="small"
              basic="very"
              compact
              inverted
              selectable
              style={{ padding: "0px", cursor: "pointer" }}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    className="tbl-header desktop"
                    width={1}
                  ></Table.HeaderCell>
                  <Table.HeaderCell className="tbl-header" width={1}>
                    Title
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    className="tbl-header"
                    width={7}
                  ></Table.HeaderCell>
                  <Table.HeaderCell className="tbl-header" width={4}>
                    Album
                  </Table.HeaderCell>
                  <Table.HeaderCell className="tbl-header" width={2}>
                    Genre
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tracks.data.map((track, index) => (
                  <Table.Row className="tbl-row" key={index}>
                    <Table.Cell className="tbl-cell desktop" textAlign="center">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className="tbl-cell tbl-img">
                      <Image
                        src={track.albums.image}
                        alt={track.albums.title}
                        size="tiny"
                      />
                    </Table.Cell>
                    <Table.Cell className="tbl-title">
                      {track.title}
                      <Table.Cell className="tbl-artist">
                        {track.artists.name}
                      </Table.Cell>
                    </Table.Cell>
                    <Table.Cell className="tbl-cell">
                      {track.albums.title}
                    </Table.Cell>
                    <Table.Cell className="tbl-cell">
                      {track.genres.genre}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

const TracksByAlbum = () => {
  const [subHeading, setSubHeading] = useState("All Tracks");
  const [curPlaying, setCurplaying] = useState(null);
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const { user } = useAuth();
  const { artistId } = useParams();
  const url = settings.baseApiUrl + "/artists/" + artistId + "/tracks";
  const {
    error,
    isLoading,
    data: tracks,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });

  useEffect(() => {
    setSubHeading("All Tracks");
  }, [pathname]);

  function handleOnClick() {
    if (subHeading === "All Tracks") {
      navigate(`/artists/${artistId}`);
    } else navigate(`/artists/${artistId}/tracks`);
  }

  return (
      <React.Fragment>
           <Outlet tracks={tracks}  context={[subHeading, setSubHeading]} />
      {" "}
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
          {tracks && tracks.filter(track => track.top_track === 0).map((t, index) => (
              <List.Item
                  key={index}
                  className="track-row"
                  onClick={() => {
                      setCurplaying(t.mp3file);
                  }}
              >
             
                  <List.Icon verticalAlign="middle" size="large" name="play circle" />
                  <List.Content verticalAlign="middle" style={{ padding: "6px" }}>
                      {t.title}
                  </List.Content>
              </List.Item>
          ))}
      
    </React.Fragment>
  );
};

export { Tracks, TracksByAlbum };
