
import { AppDispatch } from "stores/Store";
import { setToken, logout as logoutReducer } from "pages/Login/LoginSlice";

import {
  clearProfile,
} from "pages/AccountSettings/AccountSlice";

import api from "api/common";

export const login =
  ({ username, password }: { username: string; password: string }) =>{
    return api.get(`${process.env.REACT_APP_PREFIX_API3}/login`);
  }

export const getProfile = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-profile`);
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setToken({ token: "", refreshToken: "" }));
  dispatch(clearProfile());
  dispatch(logoutReducer());
};

export const getAccessMenu = (id: number) => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-access-menu`);
};

export const getAccountSettingMock = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-account-setting`);
}

export const getAccountList = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/list-account`,);
}

export const getAccountById = (userId: number) => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-account-byid`);
};
