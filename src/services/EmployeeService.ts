// import axios from "axios";
import api from "../api/common";

export interface RequestEmployee {
  allDepartment: boolean;
  allJobTitle: boolean;
  branchIds: number[];
  departmentIds: number[];
  isAlphabeticalOrder: boolean;
  isDesc: boolean;
  jobTitleIds: number[];
  keyword: string;
  pageIndex: number;
  pageSize: number;
}

export const getEmployee = (requestBody: RequestEmployee) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-employee`
  )
};
