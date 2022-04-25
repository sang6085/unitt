export interface INotifications {
  totalUnread: number;
  totalData: number;
  datas: Notification[];
}

export interface INotification {
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
export interface IAuthenticationToken {
  accessToken: string;
  refreshToken: string;
}

export interface IProfileDTO {
  userId: number;
  companyId: number;
  fullName: string;
  type: string;
  imgBase64: string;
  positionName: string;
  accountType?: string;
  orgName: string;
}

export interface ILoginSliceState {
  loading: boolean;
  authToken?: IAuthenticationToken;
  aadToken?: string;
  notifications: INotifications;
}

export interface UpdatePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface IUserDashboardSetting {
  id: number;
  chart: number;
  displayOrder: number;
  visible: boolean;
}
