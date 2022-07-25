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
  Input,
  Button,
  Segment,
} from "semantic-ui-react";
import "./artist.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import UseFetch from "../../services/useFetch";
import CreateArtist from './createArtist';
import DeleteArtist from './deleteArtist';
import EditArtist from './editArtist';

const Artist = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [subHeading, setSubHeading] = useState("All Artists");
  const [artistView, setArtistView] = useState(false);
  const [activeArtist, setActiveArtist] = useState(""); //the album being edited

  const [searchResults, setSearchResults] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [admin, setAdmin] = useState(false);

  const { error, isLoading, data: artists, getAll, search } = UseFetch();

  const disabled = user.role !== 1;
   
  
  useEffect(( ) => {
    setSubHeading("All Artists");
    getAll();
     
  
  }, [pathname, reload]);

 

  const handleCreate = (e) => {
    if (disabled) return;
    setShowCreateModal(true);
    setSubHeading("Create Artist");
  };

  const handleDelete = (e) => {
    if (disabled) return;
    let artist = {};
    ["id", "name", "description", "image"].forEach(function (key) {
      artist[key] = document.getElementById(
        `artist-${key}-` + e.target.id
      ).innerText;
    });
    setActiveArtist(artist);
    setSubHeading("Delete Artist");
    setShowDeleteModal(true);
  };

  const handleEdit = (e) => {
    if (disabled) return;
    let artist = {};
    ["id", "name", "description", "image"].forEach(
      function (key) {
        artist[key] = document.getElementById(
          `artist-${key}-` + e.target.id
        ).innerText;
      }
    );
     setActiveArtist(artist);
     setShowEditModal(true);
     setSubHeading("Edit Artist");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let term = document.getElementById("artist-search-term").value;
    if (term == "") setSubHeading("All Artists");
    else if (isNaN(term)) setSubHeading("results for '" + term + "'");
    search(term);
  };

  const handleSearchOnMobile = (e) => {
    e.preventDefault();
    let mobileTerm = document.getElementById("artist-search-term-mobile").value;
    if (mobileTerm == "") setSubHeading("All Artists");
    else if (isNaN(mobileTerm))
      setSubHeading("results for '" + mobileTerm + "'");
    search(mobileTerm);
  };

  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("artist-search-term").value = "";
    document.getElementById("artist-search-term-mobile").value = "";

    search("");
    setSubHeading("Trending Artists");
  };

  return (
    <Grid className="main" columns={1} centered style={{ padding: "0px 0px" }}>
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
        columns={3}
        style={{
          minHeight: "100vh",
          padding: "10px 14px 40px",
        }}
      >
        <Grid.Row
          className="search-bar-container desktop"
          style={{
            height: "60px",
            padding: "10px 73px",
          }}
        >
          <Segment
            className="search-bar-mobile"
            inverted
            style={{ padding: "4px 16px 2px" }}
          >
            <Input
              size="small"
              autoComplete="off"
              id="artist-search-term"
              placeholder="Search music by artists..."
              icon="search"
              iconPosition="left"
              onChange={handleSearch}
              transparent
            />

            <Button
              className="refresh-btn"
              basic
              compact
              size="mini"
              color="grey"
              onClick={clearSearchBox}
              icon="refresh"
              style={{ margin: "5px 0px" }}
            />
          </Segment>

          {!disabled ? (
            <Grid.Column floated="right">
              <Button
                floated="right"
                size="small"
                icon="plus"
                color="green"
                onClick={handleCreate}
                content="Create Artist"
              />
            </Grid.Column>
          ) : (
            ""
          )}
        </Grid.Row>

        <Grid
          className="desktop"
          style={{
            padding: "20px 0px",
            minWidth: "100%",
          }}
        >
          {showCreateModal && (
            <CreateArtist
              showModal={showCreateModal}
              setReload={setReload}
              reload={reload}
              setSubHeading={setSubHeading}
              setShowModal={setShowCreateModal}
            />
          )}
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

        <Grid.Row
          className="search-container-mobile device"
          style={{
            padding: "0px 10px",
          }}
        >
          <Segment
            inverted
            style={{ padding: "10px 6px 0px 10px", minWidth: "100%" }}
          >
            <Input
              size="small"
              autoComplete="off"
              id="artist-search-term-mobile"
              placeholder="Search music by artists..."
              icon="search"
              iconPosition="left"
              onChange={handleSearchOnMobile}
              transparent
              style={{ width: "60%" }}
            />

            <Button
              className="refresh-btn"
              floated="right"
              basic
              compact
              size="mini"
              color="grey"
              onClick={clearSearchBox}
              icon="refresh"
              style={{ margin: "0px 0px 6px" }}
            />
          </Segment>
        </Grid.Row>

        <Grid className="device" style={{ marginTop: "10px" }}>
          <Header
            textAlign="left"
            as="h4"
            inverted
            style={{ padding: "20px 30px" }}
          >
            Artists{" "}
            <span
              style={{
                fontWeight: "lighter",
                fontStyle: "italic",
                fontSize: "16px",
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
              <Card
                key={artist.id}
                raised
                className="artist-card artist-page-grid"
              >
                <Card.Content
                  id={"artist-id-" + artist.id}
                  style={{ display: "none" }}
                >
                  {artist.id}
                </Card.Content>
                <Card.Content
                  id={"artist-name-" + artist.id}
                  style={{ display: "none" }}
                >
                  {artist.name}
                </Card.Content>
                <Card.Content
                  id={"artist-description-" + artist.id}
                  style={{ display: "none" }}
                >
                  {artist.description}
                </Card.Content>
                <Card.Content
                  id={"artist-image-" + artist.id}
                  style={{ display: "none" }}
                >
                  {artist.image}
                </Card.Content>
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
                {disabled ? (
                  " "
                ) : (
                  <Button.Group inverted basic>
                    <Button id={artist.id} onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button id={artist.id} onClick={handleDelete}>
                      Delete
                    </Button>
                  </Button.Group>
                )}
              </Card>
            ))}
        </Card.Group>
      </Grid>
      {showEditModal && (
        <EditArtist
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          data={activeArtist}
          reload={reload}
          setReload={setReload}
          setSubHeading={setSubHeading}
        />
      )}
      {showDeleteModal && (
        <DeleteArtist
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          data={activeArtist}
          reload={reload}
          setReload={setReload}
          setSubHeading={setSubHeading}
        />
      )}
    </Grid>
  );
};;

export default Artist;
