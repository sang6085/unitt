// Start UserInfo

export interface UserInfo extends UserProfile {
  accountId: number;
  userName: string;
  fullName: string;
  avatarUrl: string;
  fingerprint: string; // check again
  pushNotification: string;
  pushEmail: string;
  companyInfo: CompanyInfo;
  locationInfo: string; // check again
  deviceInfo: DeviceInfo;
  languageType: string;
  groupCode: string;
  lstMenu: ListMenu<ChildrenMenu>;
  columnSettingVisitor: string;
  columnSettingAccount: null;
  language: string;
  root: string;
  companyLanguage: null;
  branchInfo: null;
  firstLogin: boolean;
  isBuilding: boolean;
  groups: any;
  ownerAccountId: number;
  showWelcomPage: boolean;
  licenseInfo: LicenseInfo;
  isEventTicket: boolean;
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

// End UserInfo

export interface Notifications {
  totalUnread: number;
  totalData: number;
  datas: Notification[];
}

export interface Notification {
  appInboxId: number;
  title: string;
  description: string;
  readFlag: boolean;
  vi: {
    title: string;
    langCode: string;
    langId: number;
    content: string;
  };
  en: {
    title: string;
    langCode: string;
    langId: number;
    content: string;
  };
  page: string;
  dataId: string;
  toastType: string;
  createdDate: Date;
  params?: object;
}

export interface AuthenticationToken {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileDTO {
  userId: number;
  companyId: number;
  fullname: string;
  type: string;
  imgBase64: string;
  positionName: string;
  accountType?: string;
  orgName: string;
}

export interface UserDashboardSetting {
  id: number;
  chart: number;
  displayOrder: number;
  visible: boolean;
}

export interface UserSliceState {
  profile?: UserInfo;
  authToken?: AuthenticationToken;
  aadToken?: string;
  locale?: string;
  mode?: string;
  notifications: Notifications;
  dashboardSettings: UserDashboardSetting[];
}

export interface UpdatePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface UserDashboardSetting {
  id: number;
  chart: number;
  displayOrder: number;
  visible: boolean;
}
