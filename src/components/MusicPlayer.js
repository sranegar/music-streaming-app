import {
  Menu,
  Grid,
  Segment,
  Icon,
  List,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import "./musicplayer.css";
import { useAuth } from "../services/useAuth";
import { useRef, useState } from "react";
import moment from "moment";

const MusicPlayer = ({
  curPlaying,
  activeSong,
  pause,
  handleOnPause,
  pauseSong,
  playSong,
  curArtist,
}) => {
  const { isAuthed } = useAuth();

  const audioRef = useRef();

  const [completed, setCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Segment basic padded>
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

      <audio
        ref={audioRef}
        id="audio"
        src={curPlaying}
        autoPlay
        onPause={handleOnPause}
        onPlay={() => {
          setInterval(() => {
            setCompleted(
              audioRef.current.currentTime / audioRef.current.duration
            );
          }, 100);
        }}
      />

      <Menu stackable widths={3} fixed="bottom" className="footer-menu">
        <Menu.Item position="left" widths={4}>
          <List size="mini" style={{ minWidth: "80%", padding: "4px 16px" }}>
            <List.Item
              className="song-title"
              style={{
                minWidth: "100%",
              }}
            >
              {activeSong}
            </List.Item>
            <List.Item
              className="artist"
              style={{
                color: "#f1e9edc4  ",
                fontSize: "13px",
                minWidth: "100%",
                letterSpacing: "1px",
                fontFamily: "Lato",
                fontWeight: "lighter",
                fontVariantCaps: "all-petite-caps",
                padding: "0px",
                marginTop: "-2px",
              }}
            >
              {curArtist}
            </List.Item>
          </List>
        </Menu.Item>
        <Menu.Item
          style={{
            padding: "16px",
            minWidth: "35%",
          }}
        >
          <Grid
            stackable
            className="music-player-menu"
            centered
            style={{ padding: "0px" }}
          >
            {curPlaying && !pause ? (
              <Grid.Row
                className="play-btn-wrapper"
                style={{ padding: "16px 0px 0px" }}
              >
                <Icon
                  className="play-btn"
                  name="pause circle"
                  onClick={pauseSong}
                  style={{
                    cursor: "pointer",
                    fontSize: "40px",
                    padding: "0px",
                    margin: "0px",
                    color: "#e2e1e3d6",
                  }}
                />
              </Grid.Row>
            ) : (
              <Grid.Row
                className="play-btn-wrapper"
                style={{ padding: "16px 0px 0px" }}
              >
                {!activeSong && !curPlaying ? (
                  <Icon
                    className="play-btn-disabled"
                    name="play circle"
                    disabled
                    style={{
                      cursor: "pointer",
                      fontSize: "40px",
                      padding: "0px",
                      margin: "0px",
                      color: "#e2e1e3d6",
                    }}
                  />
                ) : (
                  <Icon
                    className="play-btn"
                    name="play circle"
                    onClick={playSong}
                    style={{
                      cursor: "pointer",
                      fontSize: "40px",
                      padding: "0px",
                      margin: "0px",
                      color: "#e2e1e3d6",
                    }}
                  />
                )}
              </Grid.Row>
            )}

            <Grid className=" desktop" centered padded>
              <Grid.Column className="timeline-wrapper" width={16}>
                <span
                  id="seekObjContainer"
                  className="progress-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!activeSong && pause ? (
                    <p
                      style={{
                        fontSize: "10px",
                        marginRight: "10px",
                        marginTop: "-4px",
                      }}
                      className="desktop"
                    >
                      00:00
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: "10px",
                        marginRight: "10px",
                        marginTop: "-4px",
                      }}
                      className="desktop"
                    >
                      {moment
                        .unix(audioRef.current.currentTime)
                        .format("mm:ss")}
                    </p>
                  )}
                  <progress
                    id="seekObj"
                    value={isAuthed && activeSong ? completed : 0}
                    max="1"
                  ></progress>
                  {!activeSong && pause ? (
                    <p
                      style={{
                        fontSize: "10px",
                        marginLeft: "10px",
                        marginTop: "-14px",
                      }}
                      className="desktop"
                    >
                      00:00
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: "10px",
                        marginLeft: "10px",
                        marginTop: "-14px",
                      }}
                      className="desktop"
                    >
                      {moment.unix(audioRef.current.duration).format("mm:ss")}
                    </p>
                  )}
                </span>
              </Grid.Column>
            </Grid>

            <Grid padded centered className="device">
              <Grid.Column width={16}>
                <span id="seekObjContainer" className="device">
                  {!activeSong && pause ? (
                    <p
                      style={{
                        marginTop: "-6px",
                        marginRight: "4px",
                        fontSize: "10px",
                      }}
                      className="device"
                    >
                      00:00
                    </p>
                  ) : (
                    <p
                      style={{
                        marginTop: "-6px",
                        marginRight: "4px",
                        fontSize: "10px",
                      }}
                      className="device"
                    >
                      {moment
                        .unix(audioRef.current.currentTime)
                        .format("mm:ss")}
                    </p>
                  )}
                  <progress
                    id="seekObj"
                    value={isAuthed && activeSong ? completed : 0}
                    max="1"
                  ></progress>
                  {!activeSong && pause ? (
                    <p
                      style={{
                        marginTop: "-6px",
                        marginLeft: "8px",
                        fontSize: "10px",
                      }}
                      className="device"
                    >
                      00:00
                    </p>
                  ) : (
                    <p
                      style={{
                        marginTop: "-6px",
                        marginLeft: "8px",
                        fontSize: "10px",
                      }}
                      className="device"
                    >
                      {moment.unix(audioRef.current.duration).format("mm:ss")}
                    </p>
                  )}
                </span>
              </Grid.Column>
            </Grid>
          </Grid>
        </Menu.Item>
        <Menu.Item className="desktop"></Menu.Item>
      </Menu>
    </Segment>
  );
};

export default MusicPlayer;
