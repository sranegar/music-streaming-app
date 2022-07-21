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
  Form,
  Button,
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

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("artist-search-term").value = "";
    search("");
    setSubHeading("Trending Artists");
  };
 
  return (
    <Grid className='main' columns={1} centered style={{ padding: "0px 0px" }}>
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
        centered
        columns={3}
        style={{
          minHeight: "100vh",
          padding: "10px 14px 40px",
        }}
      >
        <Grid.Row
          className="search-bar-container"
          style={{
            height: "60px",
            padding: "10px 80px",
          }}
        >
          <Form
            autoComplete="off"
          
            onSubmit={handleSearch}
            style={{ width: "100%" }}
          >
            <Form.Group>
              <Form.Input
                width={9}
                id="artist-search-term"
                placeholder="Search music by artists..."
                icon="search"
                iconPosition="left"
              />

              <Form.Button
                inverted
                basic
                size="mini"
                className="desktop"
                color="grey"
                type="submit"
                icon="search"
                style={{ margin: "5px 0px", fontSize: "11px" }}
              />

              <Form.Button
                className="desktop"
                basic
                size="mini"
                inverted
                color="grey"
               
                onClick={clearSearchBox}
                icon="refresh"
                style={{ margin: "5px 10px 5px 0px", fontSize: "11px" }}
              />
            </Form.Group>
          </Form>
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
