"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@trussworks/react-uswds";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export default SubmitButton;
