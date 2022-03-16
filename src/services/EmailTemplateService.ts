// import axios from "axios";

import api from "../api/common";

export interface IRequestSearch {
  templateName?: string;
  templateCode?: string;
  fromDate?: string | Date;
  toDate?: string | Date;
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  isDesc?: boolean;
  isPaging?: boolean;
}

export interface IRequestInsert {
  templateName?: string;
  fileFormat?: string;
  fileSize?: number;
  url?: string;
  templateContent?: string;
  fileName?: string;
  subject?: string;
  repositoryId?: number;
  companyId?: number;
  templateCode?: string;
  templateType?: string;
}

export interface IRequestGetById {
  id: number;
}

export interface IRequestUpdate {
  id: number;
  templateName?: string;
  fileFormat?: string;
  fileSize?: number;
  url?: string;
  templateContent?: string;
  fileName?: string;
  actived?: number;
  subject?: string;
  repositoryId?: number;
  companyId?: number;
  templateCode?: string;
  templateType?: string;
}


export const searchEmailTemplate = (requestBody: IRequestSearch) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-email-template`
    
  );
};

export const getByIdEmailTemplates = (params: IRequestGetById) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-email-template-byid`
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
