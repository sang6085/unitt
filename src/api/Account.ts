import { AppDispatch } from "../stores/Store";
import { BaseResponse } from "../interfaces/BaseResponse";

import {
  setProfile,
  setToken,
  logout as logoutReducer,
  updateProfile,
  updateAvatar,
} from "../pages/Login/LoginSlice";

import {
  AuthenticationToken,
  UpdatePasswordDTO,
  UserProfile,
} from "../pages/Login/LoginInterface";
import axios from "axios";
axios.defaults.withCredentials = true;

export const login =
  ({ username, password }: { username: string; password: string }) => (dispatch: AppDispatch) => {
    return axios.post(`https://cip-api.checkinpro.vn/core/v1/authentication/authenticate`,
      {
        username,
        password,
        type: "WEB",
        language: "EN",
        companyUrl: "JD3T2-QH36R-X7W2W-TR3XT",
      },
      {withCredentials: true}
    ).then((response) => {
      // console.log(response.data);
      
      if(response.data.success) {
        dispatch(
          setToken({
            token: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
          })
        );
      }
      return response
    }).catch(() => {}) 
    
  };

export const loginAAD =
  (username: string, idToken: string) => async (dispatch: AppDispatch) => {
    try {
      const response: BaseResponse<AuthenticationToken> = await axios.post(
        `${process.env.REACT_APP_PREFIX_API}/authen/azure-token`,
        {
          username,
          idToken,
        }
      );
      if (!response) {
        return;
      }
      
      dispatch(
        setToken({
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          aadToken: idToken,
        })
      );

      return response;
    } catch {}
  };

export const getProfile = () => (dispatch: AppDispatch) => {
  axios.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/account/account-info`
  ).then((response) => {
    if(response.data.success) {
      dispatch(setProfile(response.data.data));
    }
  }).catch(() => {})
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setToken({ token: "", refreshToken: "" }));
  dispatch(logoutReducer());
};

export const updateUserPassword =
  (data: UpdatePasswordDTO) => async (dispatch: AppDispatch) => {
    const successStatus = axios.post(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/Account/change-password`,
      data
    ).then((response) => {
      if(response.data.success) {
        dispatch(setToken({ token: "", refreshToken: "" }));
        dispatch(logoutReducer());
      } 
      return response.data.success;
    }).catch(() => {})
    return successStatus
};

export const updateUserProfile =
  (data: UserProfile) => (dispatch: AppDispatch) => {
    axios.put(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/account/update-profile`,
      data
    ).then((response) => {
      if(response.data.success) {
        dispatch(updateProfile(response.data));
      }
    }).catch(() => {})
};

export const uploadAvatar = (data: any) => (dispatch: AppDispatch) => {
  axios.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/file/avatar/upload`,
    data
  ).then((response) => {
    if(response.data.success) {      
      dispatch(updateAvatar(response.data));
    }
  }).catch(() => {})
};
export const getAccessMenu = (id: number) => {
  return axios
    .get(
      `${process.env.REACT_APP_PREFIX_API}/core/v1/FunctionGroup/AccessMenu/${id}`
    )
    .then(async (response) => {
      return response.data;
    });
};
