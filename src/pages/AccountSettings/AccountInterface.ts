export interface IUserInfo extends IUserProfile {
  accountId: number;
  userName: string;
  fullName: string;
  avatarUrl: string;
  fingerprint: string; 
  pushNotification?: string;
  pushEmail?: string;
  companyInfo?: ICompanyInfo;
  locationInfo: string;
  deviceInfo?: IDeviceInfo;
  languageType?: string;
  groupCode?: string;
  lstMenu?: IListMenu<IChildrenMenu>;
  columnSettingVisitor?: string;
  columnSettingAccount?: null;
  language: string;
  root?: string;
  companyLanguage?: null;
  branchInfo?: null;
  firstLogin?: boolean;
  isBuilding?: boolean;
  groups?: any;
  ownerAccountId?: number;
  showWelcomPage?: boolean;
  licenseInfo?: ILicenseInfo;
  isEventTicket?: boolean;
}

export interface IUserProfile {
  firstName?: string;
  lastName?: string;
  jobTitle?: number;
  email?: string;
  phoneNumber?: string;
  avatarFileName?: string;
  avatarRepoId?: number;
  phoneJson?: string;
}

export interface ICompanyInfo {
  companyName: string;
  companyId: number;
  address: string;
  limitStorage: number;
  usageStorage: number;
  attendanceStatus: boolean;
  eventPluginState: number;
}

export interface IDeviceInfo {
  name: string;
  type: string;
  os_version: string;
  print_address: string; // check again
  timeout: number;
  id: number;
  branchId: number;
  locationId: number;
  branchCode: string;
  appVersion: string;
  deviceId: string;
}

export interface IMenu {
  code: string;
  label: string;
  codePage: number;
  url: string;
  parentId: number;
  sort: number;
  description: string;
  itemId: number;
  icon: string;
  menuType: null; // check again
  checkOpen: number;
  isActive: number;
  repositoryId: number;
  positions: null;
  companyId: number;
  id: 1027;
  created_By: string;
  created_Date: string;
  updated_By: string;
  updated_Date: string;
  deleted_By: string;
  deleted_Date: string;
  totalCount: number;
}
export interface IListMenu<T> extends IMenu {
  children: T[];
}

export interface IChildrenMenu extends IMenu {
  children: [];
}

export interface IBrandInfo {
  id: number;
  companyId: number;
  branchId: number;
  userId: number;
  branchCode: string;
  branchName: string;
  branchAddress: string;
  companyName: string;
  badgeTemplateCode: string;
  isActive: number;
}

export interface ILicenseInfo {
  duration: null;
  effectedDate: string;
  expiredDate: string;
  name: string;
  code: string;
  limitDevice: number;
  limitUser: number;
  limitContactPerson: number;
  limitBranchs: number;
  limitEvent: number;
}
