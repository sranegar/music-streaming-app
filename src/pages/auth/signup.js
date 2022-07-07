import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import "./auth.css";

import {
  Form,
  Grid,
  Icon,
  Message,
  Modal,
  Segment,
  Button,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [open, setOpen] = useState(true);
  const [account, setAccount] = useState({ role: 4 }); //set default role 4: basic user
  let { isAuthed, isLoading, error, isSignup, user, signup, login } = useAuth();
  let navigate = useNavigate();
  let from = "/signup";

  // create a user account by calling the signup function
  const createAccount = (e) => {
    e.preventDefault();
    signup(account);
  };
  // handle the change event in the four text boxes;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value }); //spread the JSON object
  };

  const handleOnClose = () => {
    setOpen(false);
    navigate("/");
  };

  // The account has been created. Sign in now.
  useEffect(() => {
    if (user) {
      login(account, () => {
        navigate(from, { replace: true });
      });
    }
  }, [isSignup]);

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
          <FontAwesomeIcon
            className="logo"
            icon={faHeadphonesSimple}
            size="2x"
            style={{ paddingRight: "10px" }}
          />
          <span> Create an Account</span>
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
              header="Your account has been created."
              content="Click the links
                                in the navbar to explore the app."
            ></Message>
          ) : (
            <Form onSubmit={createAccount}>
              <Form.Field>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleInputChange}
                />
              </Form.Field>
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
                  <Button fluid size="small" type="submit" color="green">
                    Create Account
                  </Button>
                </Grid.Column>
              </Grid>
              <Segment textAlign="center">
                <p>
                  Already have an account? <Link to="/signin">Login</Link>
                </p>
              </Segment>
            </Form>
          )}
        </Modal.Content>
      </Modal>
    </Grid>
  );
};

export default Signup;
