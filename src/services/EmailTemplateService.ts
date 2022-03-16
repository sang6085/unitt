// import axios from "axios";

import api from "../api/api";

import {
  IRequestGetById,
  IRequestInsert,
  IRequestSearch,
  IRequestUpdate,
} from "../interfaces/EmailTemplate";

export const searchEmailTemplate = (requestBody: IRequestSearch) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/emailTemplate/search`,
    requestBody
  );
};

export const getByIdEmailTemplates = (params: IRequestGetById) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/emailTemplate/getById/${params.id}`
  );
};

export const insertEmailTemplate = (requestBody: IRequestInsert) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/emailTemplate/insert`,
    requestBody
  );
};

export const updateEmailTemplate = (requestBody: IRequestUpdate) => {
  return api.put(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/emailTemplate/insert/${requestBody.id}`,
    requestBody
  );
};
