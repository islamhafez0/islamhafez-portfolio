import axios from "axios";

export const sendFormData = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const END_POINT = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(END_POINT, { name, email, message });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
