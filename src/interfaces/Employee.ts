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
