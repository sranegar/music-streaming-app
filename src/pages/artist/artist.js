/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: artistjs
Description: Create a component to display artist details
*/

import { useState } from "react";
import { settings } from "../../config/config";
import {
  Grid,
  Header,
  Segment,
  Image,
  Button,
  Loader,
  Dimmer,
  Divider,
  List,
  Card,
} from "semantic-ui-react";
import "./artist.css";
import useXmlHttp from "../../services/useXmlHttp";
import { useParams, Link, useOutletContext, Outlet } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../services/useAuth";

const Artist = () => {
  const [curPlaying, setCurplaying] = useState(null);
  const { user } = useAuth();
  const [subHeading, setSubHeading] = useOutletContext();
  const { artistId } = useParams();
  const url = settings.baseApiUrl + "/artists/" + artistId;
  const {
    error,
    isLoading,
    setData,
    data: artist,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });

  return (
    <Segment basic>
      {error && <div>{error}</div>}

      {isLoading && (
        <Dimmer
          page
          active
          verticalAlign="middle"
          style={{ paddingTop: "150px" }}
        >
          <Loader
            inline="centered"
            size="huge"
            inverted
            active
            content="Loading"
          />
        </Dimmer>
      )}

      {artist && (
        <Grid centered padded stackable doubling reversed>
          {setSubHeading(artist.name)}
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Segment basic className="artist-image-container ">
                <Image
                  className="cover-photo"
                  src={artist.image}
                  alt={artist.name}
                />
              </Segment>
              <Segment basic>
                <Header inverted as="h3" style={{ paddingBottom: "10px" }}>
                  About
                </Header>
                <p style={{ color: "white", lineHeight: 1.8 }}>
                  {artist.description}
                </p>

                <span>
                  Formed: <b>{artist.year_formed}</b>
                </span>
              </Segment>
              <Grid.Row style={{ overflow: "hidden", paddingTop: "30px" }}>
                {curPlaying && (
                  <audio src={curPlaying} autoPlay={true} controls />
                )}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7}>
              <Segment basic style={{ padding: "22px 8px", marginTop: "10px" }}>
                <Header
                  className="device"
                  inverted
                  style={{ fontSize: "32px" }}
                >
                  {subHeading}
                </Header>
                <Header
                  className="desktop"
                  inverted
                  style={{ fontSize: "44px", marginTop: "-10px" }}
                >
                  {subHeading}
                </Header>
                <Header as="h3" inverted>
                  Top Tracks
                </Header>
                {artist.tracks
                  .filter((track) => track.top_track === 1)
                  .map((t, index) => (
                    <List
                      key={index}
                      size="small"
                      inverted
                      celled
                      unordered
                      style={{
                        color: "white",
                        padding: "0px",
                        borderBottom: ".3px solid #e2e1e3d6",
                      }}
                    >
                      <List.Item
                        className="track-row"
                        onClick={() => {
                          setCurplaying(t.mp3file);
                        }}
                      >
                        <List.Icon
                          verticalAlign="middle"
                          size="large"
                          name="play circle"
                        />
                        <List.Content
                          verticalAlign="middle"
                          style={{ padding: "6px" }}
                        >
                          {t.title}
                        </List.Content>
                      </List.Item>
                    </List>
                  ))}
              </Segment>
              <Segment padded basic>
                <Header as="h3" inverted>
                  Albums
                </Header>
                <Card.Group itemsPerRow={3}>
                  {artist.albums.map((a) => (
                    <Card>
                      <Image fluid src={a.image} />
                      <Card.Header>{a.title}</Card.Header>
                    </Card>
                  ))}
                </Card.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Segment>
  );
};

export default Artist;
