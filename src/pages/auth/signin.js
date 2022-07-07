/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: signin.js
Description: This script creates the sign-in form and logs a user in.
*/

/* eslint-disable no-sequences */
// import {Button} from 'react-bootstrap';
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import {
  Button,
  Segment,
  Modal,
  Form,
  Grid,
  Icon,
  Message,
} from "semantic-ui-react";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons";

const Signin = () => {
  const [open, setOpen] = useState(true);
  let location = useLocation();
  let navigate = useNavigate();
  let [account, setAccount] = useState(null);
  let from = location.state?.from?.pathname || "/signin";
  let { isAuthed, login, isLoading, error } = useAuth();

  // verify a user's username and password by calling the login function
  const verifyAccount = (e) => {
    e.preventDefault();
    login(account, () => {
      // Send the user back to the page they tried to visit when they were
      // redirected to the login page
      navigate(from, { replace: true });
    });
  };
  // handle the change event in the two text boxes;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value }); //spread the JSON object
  };

  const handleOnClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Grid style={{ minHeight: "100vh" }}>
      <Modal
        onClose={handleOnClose}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
        size="mini"
      >
        <Modal.Header>
          {" "}
          <FontAwesomeIcon
            className="logo"
            icon={faHeadphonesSimple}
            size="2x"
            style={{ paddingRight: "10px" }}
          />
          <span className='signin-header'>Login</span>
        </Modal.Header>
        <Modal.Content>
          {error && (
            <Message negative>
              <Message.Header>{error}</Message.Header>
            </Message>
          )}
          {isLoading && (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                Please wait while data is being loaded
              </Message.Content>
            </Message>
          )}
          {isAuthed ? (
            <Message
              success
              header="You have successfully signed in."
              content="Discover new artists at the top navigation."
            ></Message>
          ) : (
            <Form onSubmit={verifyAccount}>
              <Form.Field>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Grid centered columns={1}>
                <Grid.Column>
                  <Button
                    className="form-btn"
                    fluid
                    size="small"
                    type="submit"
                    color="green"
                  >
                    Login
                  </Button>
                </Grid.Column>
              </Grid>

              <Segment textAlign="center">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </Segment>
            </Form>
          )}
        </Modal.Content>
      </Modal>
    </Grid>
  );
};

export default Signin;
