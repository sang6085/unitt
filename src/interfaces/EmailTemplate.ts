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
