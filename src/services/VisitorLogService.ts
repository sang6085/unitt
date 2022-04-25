import api from "api/common";
export interface IRequestVisitorLogs {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  fromCompany?: string;
  notYetCheckOut?: boolean | null;
  logStatus?: string;
  visitorType?: string;
  branchIds?: number[];
  keyWord?: string;
  buildingCompanyIds?: number[];
  idCard?: string;
  includeIdCardFile?: boolean;
  fromDate?: Date | string;
  toDate?: Date | string;
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  isDesc?: boolean;
  isPaging?: boolean;
}

export const getDashboardInfo = (requestBody: number[]) => {
  return api.post(`${process.env.REACT_APP_PREFIX_API}/api/v1/Dashboard/info`, {
    branchIds: requestBody,
  });
};

export const getVisitorLogs = (requestBody: IRequestVisitorLogs) => {
  return api.get(
   `${process.env.REACT_APP_PREFIX_API3}/get-visitor-logs`
  );
};

export const downloadVisitorLogs = (requestBody: IRequestVisitorLogs) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/visit/log/download`,
    requestBody,
    {},
    "blob"
  );
};
