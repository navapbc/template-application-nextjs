import { Alert, Button, Grid, GridContainer } from "@trussworks/react-uswds";
import React from "react";

/** Example page showing use of react-uswds components. Can be deleted once you're on a roll. */
const HelloWorld = () => {
  return (
    <GridContainer>
      <Grid>
        <Alert type="success" headingLevel="h1" heading="Hello world">
          This is an alert
        </Alert>
      </Grid>
      <Grid>
        <p>Here is some example text.</p>
      </Grid>
      <Grid>
        <Button type="button">Click me</Button>
      </Grid>
    </GridContainer>
  );
};

export default HelloWorld;
