import { Grid, Button, Icon, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { useState } from "react";
import "./components.css";

const TopNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthed, user } = useAuth();

  const className = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const options = [
    {
      key: "user",
      text: (
        <p style={{ color: "white", fontFamily: "arial" }}>
          {isAuthed
            ? `You are signed in as ${user.first_name} ${user.last_name}`
            : null}
        </p>
      ),
      disabled: true,
    },
    { key: "signout", text: <NavLink to="/signout">Sign out</NavLink> },
  ];

  function handleOnClick() {
    setShowMenu(!showMenu);
  }

  return (
    <Grid className="nav-bar" columns={8} reversed centered stackable padded>
      <Grid.Column className="device">
        <Icon
          name="bars"
          size="large"
          onClick={handleOnClick}
          style={{ cursor: "pointer", color: "#d7d7d7 " }}
        />
      </Grid.Column>

      {showMenu && (
        <Grid.Row className="device">
          <Grid.Column textAlign="center">
            <NavLink
              className="nav-links"
              to="/"
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <NavLink
              className="nav-links"
              to="/artists"
              onClick={() => setShowMenu(false)}
            >
              Music
            </NavLink>
          </Grid.Column>

          <Grid.Column textAlign="center">
            {isAuthed ? (
              <NavLink
                className="nav-links"
                to="/signout"
                onClick={() => setShowMenu(false)}
                style={{ color: "#d7d7d7" }}
              >
                Signout
              </NavLink>
            ) : (
              <NavLink to="/signin" className={className}>
                {" "}
                <Button
                  className="login-btn"
                  fluid
                  basic
                  inverted
                  color="grey"
                  content="Login"
                  icon="user"
                  size="small"
                ></Button>
              </NavLink>
            )}
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row className="desktop" style={{ padding: "14px 60px 14px 30px" }}>
        <Grid.Column
          verticalAlign="middle"
          width={2}
          style={{ padding: "0px" }}
        >
          <NavLink className="nav-links" to="/" style={{ fontSize: "20px" }}>
            Home
          </NavLink>
        </Grid.Column>

        <Grid.Column
          verticalAlign="middle"
          width={3}
          style={{ padding: "0px" }}
        >
          <NavLink
            className="nav-links"
            to="/artists"
            style={{ fontSize: "20px" }}
          >
            Artists
          </NavLink>
        </Grid.Column>

        <Grid.Column verticalAlign="middle" width={3} floated="right">
          {isAuthed ? (
            <Button
              className="logout-btn"
              size="mini"
              compact
              circular
              style={{ backgroundColor: "#000" }}
            >
              {" "}
              <Dropdown
                trigger={
                  <span
                    style={{
                      fontSize: "14px",
                      letterSpacing: "1px",
                      fontFamily: "Lato",
                      color: "#fff",
                      fontWeight: "100",
                    }}
                  >
                    <Icon size="large" inverted name="user circle" />
                    {user.username}
                  </span>
                }
                options={options}
                labeled
                style={{ minWidth: "min-content" }}
              />
            </Button>
          ) : (
            <NavLink to="/signin" className={className}>
              {" "}
              <Button
                className="login-btn"
                compact
                circular
                fluid
                basic
                inverted
                color="grey"
                content="Login"
                icon="user"
                size="small"
              ></Button>
            </NavLink>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TopNav;
