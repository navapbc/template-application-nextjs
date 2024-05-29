"use client";

import { useFormState } from "react-dom";

import {
  Button,
  Grid,
  GridContainer,
  Label,
  TextInput,
} from "@trussworks/react-uswds";

import { updateServerData } from "../../serverActions/serverActionExample";

const initialFormState = {
  name: "",
  email: "",
};

export default function SimpleForm() {
  const [formData, updateFormData] = useFormState(
    updateServerData,
    initialFormState
  );

  const hasReturnedFormData = formData.name || formData.email;

  return (
    <GridContainer>
      <Grid row>
        <Grid col={12}>
          <div className="usa-card">
            <div className="usa-card__header">
              <h2>Server Action Example</h2>
            </div>
            <div className="usa-card__body">
              <form action={updateFormData}>
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={formData.name}
                />

                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={formData.email}
                  className="margin-bottom-1"
                />

                <Button type="submit">Submit</Button>
              </form>
            </div>

            {hasReturnedFormData && (
              <>
                <hr />
                <div className="usa-card margin-top-2">
                  <h4>Server Action returned data</h4>
                  <div className="usa-card__body">
                    {formData.name && (
                      <div>
                        <strong>Name:</strong> {formData.name}
                      </div>
                    )}
                    {formData.email && (
                      <div>
                        <strong>Email:</strong> {formData.email}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </GridContainer>
  );
}
