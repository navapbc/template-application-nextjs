"use client";

import { useFormStatus } from "react-dom";

import { useTranslations } from "next-intl";
import { Button } from "@trussworks/react-uswds";

function SubmitButton() {
  const t = useTranslations("serverAction");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("submitting") : t("submit")}
    </Button>
  );
}

export default SubmitButton;
