import axios from "axios";

export const getMenuAccount = () => {
  return axios.get(`${process.env.REACT_APP_PREFIX_API}/api/v1/menu/getbyaccount`).then((response) => {
    return response.data;
  });
};
