export interface UserInfo extends UserProfile {
  accountId: number;
  userName: string;
  fullName: string;
  avatarUrl: string;
  fingerprint: string; 
  pushNotification?: string;
  pushEmail?: string;
  companyInfo?: CompanyInfo;
  locationInfo: string;
  deviceInfo?: DeviceInfo;
  languageType?: string;
  groupCode?: string;
  lstMenu?: ListMenu<ChildrenMenu>;
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
  licenseInfo?: LicenseInfo;
  isEventTicket?: boolean;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  jobTitle?: number;
  email?: string;
  phoneNumber?: string;
  avatarFileName?: string;
  avatarRepoId?: number;
  phoneJson?: string;
}

export interface CompanyInfo {
  companyName: string;
  companyId: number;
  address: string;
  limitStorage: number;
  usageStorage: number;
  attendanceStatus: boolean;
  eventPluginState: number;
}

export interface DeviceInfo {
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

export interface Menu {
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
export interface ListMenu<T> extends Menu {
  children: T[];
}

export interface ChildrenMenu extends Menu {
  children: [];
}

export interface BrandInfo {
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

export interface LicenseInfo {
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
