import axios from "axios";

export const getEvent = (requestBody: any) => {
  const data = axios
    .post(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/Events/search`,
      requestBody
    )
    .then((response) => {
      if (response.data.success === true) {
        return response.data;
      }
    });
  return data;
};
