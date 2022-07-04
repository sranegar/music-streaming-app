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

const Artist = ({ setCurplaying }) => {
  const [activeSong, setActiveSong] = useState(false);
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
        <Grid centered stackable doubling>
          <Grid.Row style={{ padding: "0px 20px 20px" }}>
            <Grid.Column width={8}>
              <Segment className="artist-image-container desktop">
                <Image
                  size="huge"
                  className="cover-photo desktop"
                  src={artist.image}
                  alt={artist.name}
                  style={{ position: "relative" }}
                />{" "}
                <Icon
                  name="chevron circle left"
                  onClick={handleClick}
                  className="prev-button"
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

              {/* <Segment basic className="desktop">
                <Header
                  inverted
                  style={{
                    color: "#e2e1e3d6 ",
                    fontVariantCaps: "all-petite-caps",
                    fontSize: "18px",
                  }}
                >
                  About
                </Header>
                <p style={{ color: "white", lineHeight: 1.8 }}>
                  {artist.description}
                </p>
              </Segment> */}
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment
                basic
                className="top-tracks-container"
                style={{ padding: "0px", margin: "0px" }}
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
                  {artist.name}
                </Header>
                <Header
                  className="desktop"
                  inverted
                  style={{ fontSize: "42px", margin: "0px", marginTop: "3px" }}
                >
                  {artist.name}
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
                        padding: "6px",
                        borderBottom: ".5px solid #e2e1e3d6",
                      }}
                      className="tracks-list"
                    >
                      <List.Item
                        className="track-row"
                        onClick={() => {
                          setCurplaying(t.mp3file);
                        }}
                        style={{ padding: "6px" }}
                      >
                        <List.Icon
                          verticalAlign="middle"
                          size="large"
                          name="play circle"
                        />
                        <List.Content verticalAlign="middle">
                          {t.title}
                        </List.Content>
                      </List.Item>
                    </List>
                  ))}
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid
            doubling
            centered
            style={{ margin: "0px", minWidth: "100%", paddingBottom: "50px" }}
          >
            <Header
              as="h3"
              inverted
              className="device"
              style={{ minWidth: "100%", padding: "20px 20px 0px" }}
            >
              Albums ({artist.albums.length})
            </Header>
            <Grid.Column width={16} className="artist-albums-container">
              <Header
                as="h3"
                inverted
                className="desktop"
                style={{ padding: "0px 14px" }}
              >
                Albums ({artist.albums.length})
              </Header>
              <Segment basic style={{ padding: "0px" }}>
                <Card.Group
                  stackable
                  doubling
                  itemsPerRow={10}
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
    </Segment>
  );
};

export default Artist;
