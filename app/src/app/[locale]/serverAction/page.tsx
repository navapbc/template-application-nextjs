"use client";

import { Label, TextInput } from "@trussworks/react-uswds";

import PendingStatusSubmitButton from "./SubmitButton";
import { updateServerData } from "../../serverActions/serverActionExample";
import { useFormState } from "react-dom";

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
    <>
      <h1>Server Action Example</h1>

      <form action={updateFormData} className="usa-form">
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
        />

        <PendingStatusSubmitButton />
      </form>

      {hasReturnedFormData && (
        <div className="margin-top-4">
          <h2>Server Action returned data</h2>
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
      )}
    </>
  );
}
