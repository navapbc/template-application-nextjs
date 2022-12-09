import {
  Alert,
  Button,
  Grid,
  GridContainer,
  Icon,
} from "@trussworks/react-uswds";
import Link from "next/link";
import React from "react";

/** Example page showing use of react-uswds components. Can be deleted once you're on a roll. */
const HelloWorld = () => {
  return (
    <GridContainer>
      <Grid row className="margin-bottom-3">
        <Grid col="fill">
          <Alert type="success" headingLevel="h1" heading="Hello world">
            This is an alert
          </Alert>
        </Grid>
      </Grid>
      <Grid row className="margin-bottom-3">
        <Grid col="auto">
          <Icon.Build size={9} />
        </Grid>
        <Grid col="auto">
          <p>
            Here is some example text. You can learn more{" "}
            <Link
              className="usa-link usa-link--external"
              href="https://trussworks.github.io/react-uswds/"
            >
              in the docs
            </Link>
            .
          </p>
        </Grid>
      </Grid>
      <Grid row>
        <Grid col="fill">
          <Button
            type="button"
            onClick={() => {
              console.log("hello yay");
            }}
          >
            Click me
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default HelloWorld;
