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

export interface LoginSliceState {
  loading: boolean;
  authToken?: AuthenticationToken;
  aadToken?: string;
  notifications: Notifications;
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
