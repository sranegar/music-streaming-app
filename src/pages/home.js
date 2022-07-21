import { Grid, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "../home.css";
import { useAuth } from "../services/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <Grid
      centered
      padded
      style={{ minHeight: "100vh - 323.29px", color: "white" }}
    >
      <Grid.Row>
        <Grid.Column className="home-wrapper" textAlign="center">
          <h1 className="home-h1">Music Player Demo</h1>
          <p className="home-subheader">
            Discover the possibilities of my{" "}
            <span className="free-text">music</span> player app.
          </p>

          <NavLink to="/artists">
            {user ? (
              <button className="glow-on-hover" type="button">
                <Icon
                  name="search"
                  style={{
                    color: "#d7d7d7 ",
                    marginRight: "5px",
                  }}
                />
                Music
              </button>
            ) : (
              <button className="glow-on-hover" type="button">
                Login
              </button>
            )}
          </NavLink>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
