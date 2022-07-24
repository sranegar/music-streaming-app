/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: artist.js
Description: Create a component to list all the artists
*/

import {
  Grid,
  Header,
  Image,
  Loader,
  Dimmer,
  Card,
  Input,
  Button,
  Segment,
} from "semantic-ui-react";
import "./artist.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import UseFetch from "../../services/useFetch";

const Artist = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [subHeading, setSubHeading] = useState("All Artists");
  const [artistView, setArtistView] = useState(false);
  const [searchResults, setSearchResults] = useState("");

  const { error, isLoading, data: artists, getAll, search } = UseFetch();


  
  useEffect(() => {
    setSubHeading("All Artists");
    getAll();
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    let term = document.getElementById("artist-search-term").value;
    if (term == "") setSubHeading("All Artists");
    else if (isNaN(term)) setSubHeading("results for '" + term + "'");
    search(term);
  };

  const handleSearchOnMobile = (e) => {
    e.preventDefault();
    let mobileTerm = document.getElementById("artist-search-term-mobile").value;
    if (mobileTerm == "") setSubHeading("All Artists");
    else if (isNaN(mobileTerm))
      setSubHeading("results for '" + mobileTerm + "'");
    search(mobileTerm);
  };

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("artist-search-term").value = "";
    document.getElementById("artist-search-term-mobile").value = "";

    search("");
    setSubHeading("Trending Artists");
  };

  return (
    <Grid className="main" columns={1} centered style={{ padding: "0px 0px" }}>
      {error && <div>{error}</div>}
      <Grid.Row>
        <Outlet context={[subHeading, setSubHeading]} />
      </Grid.Row>
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

      <Grid
        columns={3}
        style={{
          minHeight: "100vh",
          padding: "10px 14px 40px",
        }}
      >
        <Grid.Row
          className="search-bar-container desktop"
          style={{
            height: "60px",
            padding: "10px 73px",
          }}
        >
          <Segment
            className="search-bar-mobile"
            inverted
            style={{ padding: "4px 16px 2px" }}
          >
            <Input
              size="small"
              autoComplete="off"
              id="artist-search-term"
              placeholder="Search music by artists..."
              icon="search"
              iconPosition="left"
              onChange={handleSearch}
              transparent
            />

            <Button
              className="refresh-btn"
              basic
              compact
              size="mini"
              color="grey"
              onClick={clearSearchBox}
              icon="refresh"
              style={{ margin: "5px 0px" }}
            />
          </Segment>
        </Grid.Row>

        <Grid
          className="desktop"
          style={{
            padding: "20px 0px",
            minWidth: "100%",
          }}
        >
          <Header
            textAlign="left"
            as="h3"
            inverted
            style={{ padding: "25px 90px 5px" }}
          >
            Artists{" "}
            <span
              style={{
                fontWeight: "lighter",
                fontStyle: "italic",
                fontSize: "19px",
                letterSpacing: "1.1px",
              }}
            >
              {" "}
              / {subHeading}
            </span>
          </Header>
        </Grid>

        <Grid.Row
          className="search-container-mobile device"
          style={{
            padding: "0px 10px",
          }}
        >
          <Segment
            inverted
            style={{ padding: "10px 6px 0px 10px", minWidth: "100%" }}
          >
            <Input
              size="small"
              autoComplete="off"
              id="artist-search-term-mobile"
              placeholder="Search music by artists..."
              icon="search"
              iconPosition="left"
              onChange={handleSearchOnMobile}
              transparent
              style={{ width: "60%" }}
            />

            <Button
              className="refresh-btn"
              floated="right"
              basic
              compact
              size="mini"
              color="grey"
              onClick={clearSearchBox}
              icon="refresh"
              style={{ margin: "0px 0px 6px" }}
            />
          </Segment>
        </Grid.Row>

        <Grid className="device" style={{ marginTop: "10px" }}>
          <Header
            textAlign="left"
            as="h4"
            inverted
            style={{ padding: "10px 30px" }}
          >
            Artists{" "}
            <span
              style={{
                fontWeight: "lighter",
                fontStyle: "italic",
                fontSize: "16px",
                letterSpacing: "1.1px",
              }}
            >
              {" "}
              / {subHeading}
            </span>
          </Header>
        </Grid>
        <Card.Group
          doubling
          itemsPerRow={5}
          className="image-group"
          style={{
            padding: "30px 70px 60px",
            minWidth: "100%",
          }}
        >
          {artists &&
            artists.map((artist, i) => (
              <Card key={i} raised className="artist-card artist-page-grid">
                <NavLink to={`/artists/${artist.id}`}>
                  <Image
                    centered
                    size="huge"
                    className="artist-image desktop"
                    src={artist.image}
                    alt={artist.name}
                    style={{ minHeight: "170px" }}
                  />

                  <Image
                    centered
                    fluid
                    className="artist-image-mobile device"
                    src={artist.image}
                    alt={artist.name}
                    style={{ minHeight: "170px" }}
                  />
                  <Card.Header textAlign="center" className="artist-name">
                    {artist.name}
                  </Card.Header>
                </NavLink>
              </Card>
            ))}
        </Card.Group>
      </Grid>
    </Grid>
  );
};

export default Artist;
