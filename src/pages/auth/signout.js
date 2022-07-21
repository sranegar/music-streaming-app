
/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: signout.js
Description: This script allows user to sign-out and logs a user out.
*/

import {useAuth} from "../../services/useAuth";
import {useEffect} from 'react'
import {Grid, Advertisement, Header, Button} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

const Signout = () => {
    const {logout} = useAuth();

    //need to wrap the setState call inside useEffect.
    useEffect(() => {
        logout();
    })

    return (
      <Grid padded centered style={{ minHeight: "80vh" }}>
        <Advertisement className="sign-out-ad" unit="panorama">
          <Grid doubling stackable padded centered columns={5}>
            <Grid.Row>
              <Header as="h3" style={{ padding: "60px 0px 40px" }}>
                Sign up for free and enjoy hours of unlimited music streaming.
              </Header>
            </Grid.Row>
            <Grid.Column>
              <NavLink to="/signin">
                <Button fluid color="violet" size="small">
                  Login
                </Button>
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/signup">
                <Button fluid inverted size="small" color="grey">
                  Sign Up
                </Button>
              </NavLink>
            </Grid.Column>
          </Grid>
        </Advertisement>
      </Grid>
    );
};

export default Signout;