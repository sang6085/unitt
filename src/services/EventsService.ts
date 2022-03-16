import api from "../api/common";
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
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-events`
  )
};
