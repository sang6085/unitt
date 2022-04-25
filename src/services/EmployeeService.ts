// import axios from "axios";
import api from "api/common";

export interface IRequestEmployee {
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

export const getEmployee = (requestBody: IRequestEmployee) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API3}/get-employee`
  )
};
