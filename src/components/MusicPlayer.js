import {
  Menu,
  Grid,
  Segment,
  Icon,
  List,
  Dimmer,
  Loader,
  Input,
  Image,
  Item,
} from "semantic-ui-react";
import "./musicplayer.css";
import { useAuth } from "../services/useAuth";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = ({
  curPlaying,
  activeSong,
  pause,
  handleOnPause,
  pauseSong,
  playSong,
  curArtist,
  albumImage,
}) => {
  const { isAuthed } = useAuth();
  var player = document.getElementById("audio");
  var volControl = document.getElementById("vol-control");

  const audioRef = useRef();
const [completed, setCompleted] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [mute, setMute] = useState(true);
const [volumeIcon, setVolumeIcon] = useState(false);
const [marquee, setMarquee] = useState(false);
  
  useEffect(() => {
    var songDiv = document.querySelector('.song-title');
    var element = document.querySelector(".curplaying-container");
    var overflowX = element.offsetWidth < element.scrollWidth;
    if (overflowX) {
      setMarquee(true);
    } else {
      setMarquee(false);
    }
 
  }, [playSong]);

  

   
  function changeVolume(val) {
    var player = document.getElementById("audio");
    player.volume = val / 100;
  }

  function handleInputChange() {
    const range = document.querySelector('input[type="range"]');

    const min = range.min;
    const max = range.max;
    const val = range.value;
    range.style.backgroundSize = ((val - min) * 100) / (max - min) + "%";
  }

  const toggleMute = () => {
    var p = document.getElementById("audio");
    setMute(!mute);
    setVolumeIcon(!volumeIcon);
    p.muted = mute;
  };

  function handleBarValue() {
    const range = document.querySelector('input[type="range"]');

    if (!mute) {
      const min = range.min;
      const max = range.max;

      const val = range.value;

      range.style.backgroundSize = ((val - min) * 100) / (max - min) + "%";
    }
  }

 
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
        <Item.Group
          className="device"
          style={{ minWidth: "100%", padding: "16px 16px 12px", margin: "0px" }}
        >
          <Item.Content
            style={{
              margin: "0px",
              padding: "0px",
              minWidth: "100%",
            }}
          >
            <Item.Header
              className="song-title"
              style={{
                minWidth: "100%",
              }}
            >
              {activeSong}
            </Item.Header>
            <Item.Extra
              style={{
                color: "#f1e9edc4 ",
                fontSize: "16px",
                minWidth: "100%",
                letterSpacing: "1px",
                fontFamily: "Lato",
                fontWeight: "lighter",
                fontVariantCaps: "all-petite-caps",
                padding: "0px",
              }}
            >
              {curArtist}
            </Item.Extra>
          </Item.Content>
        </Item.Group>
        <Menu.Item position="left" widths={4} className="desktop">
          <Item.Group
            className="desktop"
            style={{ minWidth: "100%", padding: "0px 15px 0px 15px" }}
          >
            <Item style={{ minWidth: "100%" }}>
              <Item.Image src={`${albumImage}`} size="tiny" />
              <Item.Content
                className="curplaying-container"
                style={{
                  textAlign: "left",
                  margin: "0px",
                  padding: "0px 0px 0px 8px",
                  maxWidth: "70%",
                  
                }}
              > 
               
                <Item.Header className={"song-title " + ( marquee ? "song-title-animate" : "")}>{activeSong}</Item.Header>
                <Item.Extra
                  className="artist"
                  style={{
                    color: "#f1e9edc4  ",
                    fontSize: "14px",
                    minWidth: "100%",
                    letterSpacing: "1px",
                    fontFamily: "Lato",
                    fontWeight: "lighter",
                    fontVariantCaps: "all-petite-caps",
                    padding: "0px",
                    marginTop: "1px",
                  }}
                >
                  {curArtist}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
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
                      className="time desktop"
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
                      className="time desktop"
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
                      className="time desktop"
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
                      className="time desktop"
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
                    value={isAuthed && activeSong ? completed : 1}
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
        <Menu.Item className="desktop">
          <span
            className="volume-container"
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "40px",
            }}
          >
            <FontAwesomeIcon
              icon={volumeIcon ? faVolumeMute : faVolumeLow}
              size="lg"
              onClick={() => {
                toggleMute();
                handleBarValue();
              }}
              style={{
                cursor: "pointer",
                color: "#E2E1E3D6",
                width: "30px",
              }}
            />
            <input
              id="vol-control"
              type="range"
              min="0"
              max="100"
              onChange={() => {
                const initVol = document.getElementById("vol-control").value;
                changeVolume(initVol);
                handleInputChange();
              }}
            />
          </span>
        </Menu.Item>
      </Menu>
    </Segment>
  );
};

export default MusicPlayer;
