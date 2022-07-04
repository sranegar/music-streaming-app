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
  Icon,
} from "semantic-ui-react";
import "./artist.css";
import useXmlHttp from "../../services/useXmlHttp";
import {
  useParams,
  Link,
  useOutletContext,
  useNavigate,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../services/useAuth";

const Artist = () => {
  const [curPlaying, setCurplaying] = useState(null);
  const { user } = useAuth();
  const [subHeading, setSubHeading] = useOutletContext();

  const { artistId } = useParams();
  let navigate = useNavigate();
  const url = settings.baseApiUrl + "/artists/" + artistId;
  const {
    error,
    isLoading,
    setData,
    data: artist,
  } = useXmlHttp(url, "GET", { Authorization: `Bearer ${user.jwt}` });

  function handleClick() {
    navigate(`/artists`);
  }

  console.log(artist);
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
        <Grid centered padded stackable doubling>
          {setSubHeading(artist.name)}
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Segment basic className="artist-image-container desktop">
                <Image
                  className="cover-photo desktop"
                  src={artist.image}
                  alt={artist.name}
                />
              </Segment>
              <Segment basic className="artist-image-container-device device">
                <Image
                  className="artist-image-device device"
                  centered
                  size="small"
                  src={artist.image}
                  alt={artist.name}
                />
              </Segment>
              <Segment basic className="desktop">
                <Header inverted as="h3" style={{ paddingBottom: "10px" }}>
                  About
                </Header>
                <p style={{ color: "white", lineHeight: 1.8 }}>
                  {artist.description}
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column width={7}>
              <Segment
                basic
                className="top-tracks-container"
                style={{ padding: "22px 8px", marginTop: "8px" }}
              >
                <Header
                  className="device"
                  inverted
                  style={{
                    fontSize: "34px",
                    marginTop: "-5px",
                    textAlign: "center",
                  }}
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
                        padding: "2px",
                        borderBottom: ".3px solid #e2e1e3d6",
                      }}
                      className="tracks-list"
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
              <Grid.Row style={{ overflow: "hidden", paddingTop: "30px" }}>
                {curPlaying && (
                  <audio src={curPlaying} autoPlay={true} controls />
                )}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid doubling centered style={{ margin: "0px" }}>
            <Grid.Column width={15}>
              <Header as="h3" inverted>
                Albums
              </Header>
              <Segment basic style={{ padding: "0px" }}>
                <Card.Group
                  stackable
                  doubling
                  itemsPerRow={6}
                  className="album-group"
                >
                  {artist.albums.map((a) => (
                    <Card className="album-card">
                      <Image fluid src={a.image} />
                      <Card.Content style={{ padding: "0px" }}>
                        <Card.Header className="album-header">
                          {a.title}
                        </Card.Header>
                        <Card.Meta extra className="album-meta">
                          {a.year_released}
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid>
      )}
      <Divider />

      <Header
        textAlign="left"
        as="h3"
        inverted
        style={{ padding: "20px 30px 0px" }}
      >
        Artists / Trending Artists
      </Header>
    </Segment>
  );
};

export default Artist;
