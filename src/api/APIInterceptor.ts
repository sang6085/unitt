import axios from "axios";
import { loadProgressBar } from "x-axios-progress-bar";
import 'x-axios-progress-bar/dist/nprogress.css'
import { LocalStorageKey } from "../configs/consts";
import { storeType } from "../stores/Store";
import { logout } from "./Account";

const interceptor = (store: storeType): void => {
  const {dispatch} = store;
  //Show loading progress bar
  loadProgressBar({},axios)
  axios.interceptors.request.use(
    async (config) => {
      const token: string = localStorage.getItem(
        LocalStorageKey.TOKEN
      ) as string;
      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
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
    async (error) => {
      try {
        if (error?.response?.status === 401) {
          const originalRequest = error.config;
          handleRenewToken(originalRequest);
        }
        return Promise.reject(error);
      } catch (err) {}
    }
  );

  const handleRenewToken = async (originalRequest: any) => {
    originalRequest._retry = true;
    const refreshToken: string = localStorage.getItem(
      LocalStorageKey.REFRESH_TOKEN
    ) as string;
    const getToken = await axios.post(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/account/refresh_token`,
      {
        refreshToken: refreshToken,
      }
    );    
    if(getToken.data.success) {
      localStorage.setItem(LocalStorageKey.TOKEN, getToken.data.data.accessToken);
      localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, getToken.data.data.refreshToken);
    } else {
      localStorage.setItem(LocalStorageKey.TOKEN, "");
      localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, "");
      dispatch(logout());
    }
    return axios(originalRequest);
  };
};

export default { interceptor };
