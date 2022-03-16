import axios from "axios";
import { loadProgressBar } from "x-axios-progress-bar";
import "x-axios-progress-bar/dist/nprogress.css";
import { LocalStorageKey } from "../configs/consts";

import api from "./api";
import { storeType } from "../stores/Store";
import { logout } from "../services/AccountService";
import { setErrorApi } from "../pages/BaseLayout/ConfigSlice";
import { setToken } from "../pages/Login/LoginSlice";
import { BaseResponse } from "../interfaces/BaseResponse";
import { AuthenticationToken } from "../pages/Login/LoginInterface";

const interceptor = (store: storeType): void => {
  const { dispatch } = store;
  //Show loading progress bar
  loadProgressBar({}, axios);
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(LocalStorageKey.TOKEN) || null;
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return Promise.resolve(res);
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          const originalRequest = error.config;
          handleRenewToken(originalRequest);
        } else {
          dispatch(
            setErrorApi({
              status: error?.response.status,
              statusText: error?.response.statusText,
            })
          );
        }
      }
      return Promise.reject(error);
    }
  );

  const handleRenewToken = async (originalRequest: any) => {
    originalRequest._retry = true;
    const refreshToken: string = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN) as string;
    api
      .post<BaseResponse<AuthenticationToken>>(
        `${process.env.REACT_APP_PREFIX_API}/api/v1/authentication/refresh-token`,
        {
          refreshToken: refreshToken,
        }
      )
      .subscribe((response) => {
        if (response?.success) {
          localStorage.setItem(LocalStorageKey.TOKEN, response?.data.accessToken);
          localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, response?.data.refreshToken);
          dispatch(
            setToken({
              token: response?.data.accessToken,
              refreshToken: response?.data.refreshToken,
              aadToken: "",
            })
          );
          return axios(originalRequest);
        } else {
          localStorage.setItem(LocalStorageKey.TOKEN, "");
          localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, "");
          dispatch(logout());
        }
      });
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { interceptor };
