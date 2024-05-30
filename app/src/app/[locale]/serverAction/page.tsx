// Server Action example
// For more context: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

"use client";

import FormInput from "../../../components/FormInput";
import SubmitButton from "../../../components/SubmitButton";
import { updateServerData } from "./actions";
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
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Name"
          defaultValue={formData.name}
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          defaultValue={formData.email}
        />
        <SubmitButton />
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
