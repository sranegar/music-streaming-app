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
} from "semantic-ui-react";
import "./artist.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useXmlHttp from "../../services/useXmlHttp";
import { useAuth } from "../../services/useAuth";

const Artist = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [subHeading, setSubHeading] = useState("Trending Artists");
  const [url, setUrl] = useState(settings.baseApiUrl + "/artists");
  const {
    error,
    isLoading,
    data: artists,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });

  useEffect(() => {
    setSubHeading("Trending Artists");
 
  }, [pathname]);

 
  
  return (
    <Grid columns={1} centered padded style={{ padding: "0px 5px" }}>
      <Grid doubling stackable>
        <Outlet  context={[subHeading, setSubHeading]} />
      </Grid>
      <Grid.Column>
        <Header as="h3" inverted style={{ paddingLeft: "26px" }}>
          Artists <span>/ {subHeading}</span>
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
      <Grid columns={1} padded  style={{ minHeight: "100vh" }}>
        <Divider />
        {artists && (
          <Card.Group
          
            itemsPerRow={5}
            className="image-group"
            size="medium"
          >
            {artists.data &&
              artists.data.map((artist, i) => (
                <Card centered className="artist-image-container">
                  <NavLink key={i} to={`/artists/${artist.id}`}  >
                    <Image
                      centered
                      size='small'
                      className="artist-image"
                      circular
                      src={artist.image}
                      alt={artist.name}
                    />
                    <Card.Header
                      as="h3"
                      textAlign="center"
                      className="artist-name"
                    >
                      {artist.name}
                    </Card.Header>
                  </NavLink>
                </Card>
              ))}
          </Card.Group>
        )}
      </Grid>
    </Grid>
  );
};

export default Artist;
