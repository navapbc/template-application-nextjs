"use client";

import { Label, TextInput } from "@trussworks/react-uswds";

interface FormInputProps {
  id: string;
  name: string;
  type: "number" | "search" | "text" | "email" | "password" | "tel" | "url";
  label: string;
  defaultValue?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  label,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <TextInput
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="margin-bottom-1"
      />
    </>
  );
};

export default FormInput;
