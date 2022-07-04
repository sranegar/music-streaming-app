/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: artist.js
Description: Create a component to list all the artists
*/

import { settings } from "../../config/config";
import {
  Grid,
  Header,
  Image,
  Loader,
  Dimmer,
  Divider,
  Card,
  Container,
  Segment,
  Form,
  Button,
  Icon,
} from "semantic-ui-react";
import "./artist.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import UseFetch from "../../services/useFetch";

const Artist = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [subHeading, setSubHeading] = useState("Trending Artists");
  const [artistView, setArtistView] = useState(false);
  const [url, setUrl] = useState(settings.baseApiUrl + "/artists");
  const { error, isLoading, data: artists, getAll, search } = UseFetch();

  console.log(artists);

  useEffect(() => {
    setSubHeading("Trending Artists");
    getAll();
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = document.getElementById("artist-search-term").value;
    if (term == "") setSubHeading("Trending Artists");
    else if (isNaN(term))
      setSubHeading("artists containing term '" + term + "'");
    search(term);
  };

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("artist-search-term").value = "";
    search("");
    setSubHeading("Trending Artists");
  };

  return (
    <Grid columns={1} centered style={{ padding: "0px 0px" }}>
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
        columns={2}
        style={{
          minHeight: "100vh",
          padding: "10px 14px 40px",
          minWidth: "100%",
        }}
      >
        {/* <Grid.Column width={15} className="searchbar-mobile device">
            <Form
              className="device"
              inverted
              size="small"
              style={{ padding: "0px 10px 20px", minWidth: "100%" }}
              onSubmit={handleSearch}
            >
              <Form.Input
                size="small"
                width={16}
                id="artist-search-term"
                placeholder="Search artists..."
              />
            </Form>
          </Grid.Column> */}

        <Grid.Column
          style={{ minWidth: "100%", height: "60px", padding: "0px  80px" }}
        >
          <Form inverted onSubmit={handleSearch} style={{ width: "100%" }}>
            <Form.Group>
              <Form.Input
                width={16}
                id="artist-search-term"
                placeholder="Search music by artists..."
              
              />
              <Button
                circular
                inverted
                className="desktop"
               
                color="grey"
                type="submit"
                icon="search"
              />
              <Button
                circular
                className="desktop"
                basic
                inverted
                color="grey"
                style={{ marginLeft: "2px" }}
                onClick={clearSearchBox}
                icon="refresh"
              />
            </Form.Group>
          </Form>
        </Grid.Column>

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
            Artists <span style={{fontWeight: 'lighter', fontStyle: 'italic', fontSize: '19px', letterSpacing: '1.1px'}}> / {subHeading}</span>
          </Header>
        </Grid>

        <Card.Group
          doubling
          stackable
          itemsPerRow={5}
          className="image-group"
          style={{
            padding: "30px 70px 60px",
            minWidth: "100%",
          }}
        >
          {artists &&
            artists.map((artist, i) => (
              <Card raised className="artist-card artist-page-grid">
                <NavLink
                  key={i}
                  to={`/artists/${artist.id}`}
                  onClick={() => setArtistView(true)}
                >
                  <Image
                    centered
                    fluid
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
