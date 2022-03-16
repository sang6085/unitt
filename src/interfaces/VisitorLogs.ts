export interface RequestVisitorLogs {
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
