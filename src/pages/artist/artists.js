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
import useXmlHttp from "../../services/useXmlHttp";
import { useAuth } from "../../services/useAuth";
import useAxios from "../../services/useAxios";

const Artist = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [subHeading, setSubHeading] = useState("Trending Artists");
  const [artistView, setArtistView] = useState(false);
  const [url, setUrl] = useState(settings.baseApiUrl + "/artists");
  const {
    error,
    isLoading,
    data: artists,
    getAll,
    search,
  } = useAxios(url, "GET", { Authorization: "Bearer " + user.jwt });

  console.log(artists);

  useEffect(() => {
    setSubHeading("Trending Artists");
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = document.getElementById("album-search-term").value;
    if (term == "") setSubHeading("All Albums");
    else if (isNaN(term))
      setSubHeading("Albums containing term '" + term + "'");
    search(term);
  };

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("artist-search-term").value = "";
    search("");
  };

  return (
    <Grid columns={1} centered style={{ padding: "0px 5px" }}>
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

      {artists && (
        <Grid centered style={{ minHeight: "100vh", padding: '10px 14px 40px'}}>
          <Grid.Column width={15} className="searchbar-mobile device">
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
          </Grid.Column>

          <Grid.Column width={14} className="desktop">
            <Form inverted size="small" onSubmit={handleSearch}>
              <Form.Group>
                <Form.Input
                  width={14}
                  size="small"
                  className="desktop"
                  id="artist-search-term"
                  placeholder="Search artists..."
                />
                <Button
                  className="desktop"
                  inverted
                  size="small"
                  color="grey"
                  type="submit"
                  icon="search"
                />
                <Button
                  size="small"
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
          {artistView ? (
            ""
          ) : (
            <Grid
              className="desktop"
              style={{
                padding: "20px 0px",
                minWidth: "98%",
              }}
            >
              <Header
                textAlign="left"
                as="h3"
                inverted
                style={{ padding: "20px 50px 10px" }}
              >
                Artists <span>/ {subHeading}</span>
              </Header>
            </Grid>
          )}
          <Grid.Row></Grid.Row>
          <Card.Group
            doubling
            stackable
            itemsPerRow={3}
            className="image-group"
            size="medium"
            style={{
              padding: "0px 60px 60px",
            }}
          >
            {artists.data &&
              artists.data.map((artist, i) => (
                <Card raised className="artist-card artist-page-grid">
                  <NavLink
                    key={i}
                    to={`/artists/${artist.id}`}
                    onClick={() => setArtistView(true)}
                  >
                    <Image
                      centered
                      fluid
                      size="massive"
                      className="artist-image desktop"
                      src={artist.image}
                      alt={artist.name}
                      style={{ minHeight: "300px" }}
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
      )}
    </Grid>
  );
};

export default Artist;
