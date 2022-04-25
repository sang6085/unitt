
import api from "api/common";

export const getEmailList = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/email`,);
}

export const getEmailById = () => {
    return api.get(`${process.env.REACT_APP_PREFIX_API3}/email-by-id`,);
  }
