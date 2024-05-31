"use server";

interface FormDataState {
  name: string;
  email: string;
}

export async function updateServerData(
  prevState: FormDataState,
  formData: FormData
): Promise<FormDataState> {
  console.log("prevState => ", prevState);
  console.log("formData => ", formData);

  // With a server form, formData is null and only prevState can be used
  const name = (formData?.get("name") as string) || prevState.name;
  const email = (formData?.get("email") as string) || prevState.email;

  // In a real application, you would typically perform
  // some server mutation.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const updatedData: FormDataState = {
    name: name || prevState.name,
    email: email || prevState.email,
  };

  return updatedData;
}
