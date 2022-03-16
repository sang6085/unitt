
  export interface User {
    index?: number,
    id?: number,
    employeeCode?: string,
    userName?: string,
    fullName?: string,
    birthday?: string,
    email?: string,
    phone?: string,
    position?: string,
    organization?: string,
    enabled?: boolean,
    locked?: boolean
  }
  
  export interface IInfo {
  employeeCode: string;
  userName: string;
  fullName: string;
  password: string;
  birthday: string;
  gender: string;
  email: string;
  phone: string;
  locked: boolean;
  enabled: boolean;
  group: any;
  }

  export interface IUserSearch {
    search: string;
    id: number | string;
    userName: string;
    fullName: string;
    email: string;
    organization: string;
    phone: string;
  }