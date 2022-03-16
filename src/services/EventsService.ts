import api from "../api/api";
export interface ISearchEvents {
  eventName?: string;
  hostName?: string;
  description?: string;
  address?: string;
  branchIds?: number[];
  keyWord?: string;
  fromDate?: Date | string;
  toDate?: Date | string;
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  isDesc?: true;
  isPaging?: true;
}

export const searchEvents = (requestBody: ISearchEvents) => {
  return api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/events/search`,
    requestBody
  );
};
