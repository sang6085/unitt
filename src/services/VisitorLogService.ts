import api from "../api/api";
import { RequestVisitorLogs } from "../interfaces/VisitorLogs";

export const getDashboardInfo = (requestBody: number[]) => {
  return api.post(`${process.env.REACT_APP_PREFIX_API}/api/v1/Dashboard/info`, {
    branchIds: requestBody,
  });
};

export const getVisitorLogs = (requestBody: RequestVisitorLogs) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/visit/log/getlogs`,
    requestBody
  );
};

export const downloadVisitorLogs = (requestBody: RequestVisitorLogs) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/visit/log/download`,
    requestBody,
    {},
    "blob"
  );
};
