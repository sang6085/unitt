import axios from "axios";
import { loadProgressBar } from "x-axios-progress-bar";
import 'x-axios-progress-bar/dist/nprogress.css'
import { LocalStorageKey } from "../configs/consts";

import { storeType } from "../stores/Store";
import { logout } from "../services/AccountService";
import { setErrorApi } from "../pages/BaseLayout/BaseSlice";

const interceptor = (store: storeType): void => {
  const { dispatch } = store;
  //Show loading progress bar
  loadProgressBar({}, axios)
  axios.interceptors.request.use((config) => {
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
      console.log('error', error);
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          const originalRequest = error.config;
          handleRenewToken(originalRequest);
        } else {
          dispatch(setErrorApi(error?.response))
        }
      }
      return Promise.reject(error);
    }
  );

  const handleRenewToken = async (originalRequest: any) => {
    originalRequest._retry = true;
    const refreshToken: string = localStorage.getItem(
      LocalStorageKey.REFRESH_TOKEN
    ) as string;

    axios.post(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/account/refresh_token`,
      { refreshToken: refreshToken }
    ).then((response) => {
      if (response.data.success) {
        console.log(response);
        localStorage.setItem(LocalStorageKey.TOKEN, response.data.data.accessToken);
        localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, response.data.data.refreshToken);
      } else {
        localStorage.setItem(LocalStorageKey.TOKEN, "");
        localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, "");
        dispatch(logout());
      }
    });
    return axios(originalRequest);
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { interceptor };