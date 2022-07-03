/*
Name: Stephanie Ranegar
Date: 6/12/2022
File: album.js
Description: Create a component to display album details
*/

import React from "react";
import {settings} from "../../config/config";
import {
    Grid,
    Header,
    Image,
    Loader,
    Dimmer,
    Segment,
    List,
    Divider,
    Container,
} from 'semantic-ui-react';
import './album.css';
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, useOutletContext, Outlet, useNavigate} from "react-router-dom";
import {useState} from 'react';

import {useAuth} from "../../services/useAuth";


const AlbumByArtist = () => {
    const [curPlaying, setCurplaying] = useState(null);
    const {user} = useAuth();
    let navigate = useNavigate();
    const [subHeading, setSubHeading] = useOutletContext();
    const {albumId} = useParams();
    const url = settings.baseApiUrl + "/albums/" + albumId;
    const {
        error,
        isLoading,
        setData,
        data: album

    } = useXmlHttp(url, 'GET', {Authorization: `Bearer ${user.jwt}`});


    return (
      <Grid doubling stackable columns={3}>
        <Outlet />
        {error && <div>{error}</div>}

        {isLoading && (
          <Container style={{ backgroundColor: "#040404" }}>
            <Dimmer page active>
              <Loader
                inline="centered"
                size="big"
                inverted
                active
                content="Loading"
              />
            </Dimmer>
          </Container>
        )}

        {album &&
          (album.length === 0 ? (
            <Header as="h5" inverted>
              No albums at this time.
            </Header>
          ) : (
            ""
          ))}

        {album && (
          <Grid.Row>
            {setSubHeading(album.title) }
        
            <Grid.Column width={6} style={{ overflow: "hidden" }}>
              <Image centered size="large" src={album.image} alt={album.name} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment basic>
                <Header inverted as="h2">
                  {album.title}
                </Header>
                <Grid padded doubling columns={4}>
                  {album.artists.map((artist, index) => (
                    <Grid.Column key={index}>
                      <Header as="h6" style={{ color: "white" }}>
                        {artist.name}
                      </Header>
                    </Grid.Column>
                  ))}
                  {album.collections.map((collect, index) => (
                    <Grid.Column key={index}>
                      <Header as="h6" style={{ color: "white" }}>
                        {collect.release_year}
                      </Header>
                    </Grid.Column>
                  ))}
                </Grid>

                {album.tracks.length === 0 ? (
                  <Header inverted as="h5">
                    No tracks available at this time.
                  </Header>
                ) : (
                  <List
                    size="small"
                    inverted
                    celled
                    ordered
                    style={{ color: "white", padding: "0px 10px" }}
                  >
                    {album.tracks.map((track, index) => (
                      <List.Item
                        className="track-list-item"
                        key={track.track_id}
                        onClick={() => {
                          setCurplaying(track.mp3file);
                        }}
                        style={{ padding: "8px", cursor: "pointer" }}
                      >
                        <List.Content style={{ paddingLeft: "10px" }}>
                          {track.title}
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                )}
              </Segment>
              <Grid.Row style={{ overflow: "hidden", paddingTop: "10px" }}>
                {curPlaying && (
                  <audio src={curPlaying} autoPlay={true} controls />
                )}
              </Grid.Row>
            </Grid.Column>
            <Grid.Row
            >
            
            </Grid.Row>
          </Grid.Row>
        )}
        <Divider />
      </Grid>
    );
};

export {AlbumByArtist}
