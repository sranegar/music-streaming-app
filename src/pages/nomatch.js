import { Grid } from "semantic-ui-react";

const Nomatch = () => {
  return (
    <Grid
      verticalAlign="middle"
      centered
      padded
      style={{ minHeight: "100vh", color: "white", paddingBottom: "100px" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>Error</h1>
          <h3 style={{ fontWeight: "lighter" }}>404 Page Not Found</h3>
          <h4 style={{ fontWeight: "lighter" }}>
            {" "}
            The page requested could not found. Please check your request and
            try again.
          </h4>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Nomatch;
