"use client";

import { useFormState } from "react-dom";

import { useTranslations } from "next-intl";
import { Label, TextInput } from "@trussworks/react-uswds";

import SubmitButton from "../../../components/SubmitButton";
import { updateServerData } from "./actions";

const initialFormState = {
  name: "",
  email: "",
};

export default function ClientForm() {
  const t = useTranslations("serverAction");
  const [formData, updateFormData] = useFormState(
    updateServerData,
    initialFormState
  );

  const hasReturnedFormData = formData.name || formData.email;

  return (
    <>
      <form action={updateFormData} className="usa-form">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <TextInput
          id="name"
          name="name"
          type="text"
          defaultValue={formData.name}
          required
        />
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <TextInput
          id="email"
          name="email"
          type="email"
          defaultValue={formData.email}
          className="margin-bottom-1"
          required
        />
        <SubmitButton />
      </form>

      {hasReturnedFormData && (
        <div className="margin-top-4">
          <h2>{t("returnedDataHeader")}</h2>
          {formData.name && (
            <div>
              <strong>{t("nameLabel")}:</strong> {formData.name}
            </div>
          )}
          {formData.email && (
            <div>
              <strong>{t("emailLabel")}:</strong> {formData.email}
            </div>
          )}
        </div>
      )}
    </>
  );
}
