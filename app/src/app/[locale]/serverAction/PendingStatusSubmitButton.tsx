"use client";

import { Button } from "@trussworks/react-uswds";
import { useFormStatus } from "react-dom";

function PendingStatusSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export default PendingStatusSubmitButton;
