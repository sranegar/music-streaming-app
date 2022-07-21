/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: albums.js
Description: Create two components. Create a component to list all the albums AND a component
that list all albums by an artist that renders inside the Artist component
*/

import { settings } from "../../../config/config";
import useXmlHttp from "../../../services/useXmlHttp";
import {
  useOutletContext,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  NavLink,
} from "react-router-dom";
import "./album.css";
import {
  Grid,
  Segment,
  Header,
  Image,
  Loader,
  Dimmer,
  Container,
  Divider,
  Card,
  Form,
  Button,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../services/useAuth";
import { useState, useEffect } from "react";
import UseFetch from "../../../services/useFetch";
import CreateAlbum from "./createAlbum";
import DeleteAlbum from "./deleteAlbum";
import EditAlbum from "./editAlbum";

const Albums = () => {
  const { error, isLoading, data: albums, getAll, search } = UseFetch();
  const [subHeading, setSubHeading] = useState("All Albums");
  const [activeAlbum, setActiveAlbum] = useState(""); //the album being edited
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reload, setReload] = useState(false);

  //user auth
  const { user } = useAuth();
  const disabled = user.role !== 1;

  useEffect(() => {
    getAll();
  }, [reload]);

  const handleCreate = (e) => {
    if (disabled) return;
    setShowCreateModal(true);
    setSubHeading("Create Album");
  };

  const handleDelete = (e) => {
    if (disabled) return;
    let album = {};
    ["number", "title", "total_tracks", "image", "description"].forEach(
      function (key) {
        album[key] = document.getElementById(
          `album-${key}-` + e.target.id
        ).innerText;
      }
    );
    setActiveAlbum(album);
    setSubHeading("Delete Album");
    setShowDeleteModal(true);
  };

  const handleEdit = (e) => {
    if (disabled) return;
    //retrieve album data and pass it to the update page
    let album = {};
    ["number", "title", "total_tracks", "image", "description"].forEach(
      function (key) {
        album[key] = document.getElementById(
          `album-${key}-` + e.target.id
        ).innerText;
      }
    );
    setActiveAlbum(album);
    setShowEditModal(true);
    setSubHeading("Edit Album");
  };

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
    document.getElementById("album-search-term").value = "";
    search("");
  };

  return (
    <Grid columns={1} padded style={{ padding: "0px 5px" }}>
      <Grid.Row columns={1}>
        <Outlet context={[subHeading, setSubHeading]} />
      </Grid.Row>
      <Grid.Column>
        <Header as="h3" inverted style={{ paddingLeft: "26px" }}>
          Albums <span>/ {subHeading}</span>
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
      {albums && (
        <Grid style={{ minHeight: "100vh" }} stackable>
          <Grid.Row columns={2} style={{ padding: "20px 60px" }}>
            <Grid.Column width={8} floated="right">
              <Form
                inverted
                size="small"
                style={{ padding: "0px", minWidth: "600px" }}
                onSubmit={handleSearch}
              >
                <Form.Group>
                  <Form.Input
                    inverted
                    width={12}
                    id="album-search-term"
                    placeholder="Search albums..."
                  />
                  <Button
                    className="desktop"
                    inverted
                    color="grey"
                    type="submit"
                    icon="search"
                  />
                  <Button
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
            {showCreateModal ? (
              ""
            ) : (
              <Grid.Column textAlign="right">
                <Button
                  size="small"
                  icon="plus"
                  color="green"
                  disabled={disabled}
                  onClick={handleCreate}
                  content="Create Album"
                />
              </Grid.Column>
            )}
          </Grid.Row>
          <Divider />
          {showCreateModal && (
            <CreateAlbum
              showModal={showCreateModal}
              setReload={setReload}
              reload={reload}
              setSubHeading={setSubHeading}
              setShowModal={setShowCreateModal}
            />
          )}
          <Outlet context={[subHeading, setSubHeading]} />
          <Card.Group
            doubling
            itemsPerRow={6}
            style={{ padding: "0px 80px 20px" }}
          >
            {albums.map((album, index) => (
              <Card
                key={album.number}
                raised
                className="album-card album-page-grid"
                style={{ padding: "10px", minWidth: "160px" }}
              >
                <Card.Content
                  id={"album-number-" + album.number}
                  style={{ display: "none" }}
                >
                  {album.number}
                </Card.Content>
                <Card.Content
                  id={"album-title-" + album.number}
                  style={{ display: "none" }}
                >
                  {album.title}
                </Card.Content>
                <Card.Content
                  id={"album-total_tracks-" + album.number}
                  style={{ display: "none" }}
                >
                  {album.total_tracks}
                </Card.Content>
                <Card.Content
                  id={"album-image-" + album.number}
                  style={{ display: "none" }}
                >
                  {album.image}
                </Card.Content>
                <Card.Content
                  id={"album-description-" + album.number}
                  style={{ display: "none" }}
                >
                  {album.description}
                </Card.Content>
                {disabled ? (
                  " "
                ) : (
                  <Button.Group inverted basic>
                    <Button id={album.number} onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button id={album.number} onClick={handleDelete}>
                      Delete
                    </Button>
                  </Button.Group>
                )}
                {/*<NavLink to={`/albums/${album.number}`}>*/}
                <Image
                  id={"album-image-" + album.number}
                  centered
                  fluid
                  src={album.image}
                  alt={album.title}
                  verticalAlign="middle"
                  style={{ minHeight: "150px" }}
                />
                <Card.Content style={{ padding: "10px 0px 6px" }}>
                  <Card.Header
                    id={"album-title-" + album.number}
                    style={{ color: "#E2E1E3D6", fontSize: "14px" }}
                  >
                    {album.title}
                  </Card.Header>
                </Card.Content>
                {album.artists.map((a, index) => (
                  <Card.Content
                    key={index}
                    style={{ padding: "0px 3px", border: "none" }}
                  >
                    <p
                      style={{
                        color: "#6a6a6a",
                      }}
                    >
                      <Image
                        avatar
                        src={a.image}
                        alt={a.name}
                        size="mini"
                        style={{ marginRight: "6px" }}
                      />
                      {a.name}
                    </p>
                  </Card.Content>
                ))}
                <Card.Content
                  style={{ padding: "10px 4px 0px", textAlign: "right" }}
                >
                  <p
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "10px",
                      color: "#5a5a5a",
                      fontSize: "10px",
                      fontVariantCaps: "all-small-caps",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faMusic}
                      size="lg"
                      style={{
                        paddingRight: "3px",
                        color: "#bf22a2",
                      }}
                    />{" "}
                    {album.total_tracks} Tracks
                  </p>
                </Card.Content>
                {/*</NavLink>*/}
              </Card>
            ))}
          </Card.Group>
          {showDeleteModal && (
            <DeleteAlbum
              showModal={showDeleteModal}
              setShowModal={setShowDeleteModal}
              data={activeAlbum}
              reload={reload}
              setReload={setReload}
              setSubHeading={setSubHeading}
            />
          )}
          )
          {showEditModal && (
            <EditAlbum
              showModal={showEditModal}
              setShowModal={setShowEditModal}
              data={activeAlbum}
              reload={reload}
              setReload={setReload}
              setSubHeading={setSubHeading}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

const AlbumsByArtist = () => {
  const [subHeading, setSubHeading] = useState("All Albums");
  const { pathname } = useLocation();
  const { artistId } = useParams();
 
  useEffect(() => {
    setSubHeading("All Albums");
  }, [pathname]);

 
  return (
    
      <Grid centered>
      <Outlet context={[subHeading, setSubHeading]} />
      </Grid>
  
  );
};

export { Albums, AlbumsByArtist };
