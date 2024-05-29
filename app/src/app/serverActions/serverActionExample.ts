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

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // In a real application, you would typically perform
  // some server mutation.
  await Promise.resolve();

  const updatedData: FormDataState = {
    name: name || prevState.name,
    email: email || prevState.email,
  };

  return updatedData;
}
