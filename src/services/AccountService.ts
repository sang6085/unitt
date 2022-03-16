import { AppDispatch } from "../stores/Store";
import { setToken, logout as logoutReducer } from "../pages/Login/LoginSlice";

import { UpdatePasswordDTO } from "../pages/Login/LoginInterface";

import {
  updateProfile,
  updateAvatar,
  clearProfile,
  setProfile,
} from "../pages/Profile/ProfileSlice";
import { UserProfile } from "../pages/Profile/ProfileInterface";

import api from "../api/api";

export const login =
  ({ username, password }: { username: string; password: string }) =>
  (dispatch: AppDispatch) => {
    const ResLg = api.post(
      `${process.env.REACT_APP_PREFIX_API}/core/v1/authentication/authenticate`,
      {
        username,
        password,
        type: "WEB",
        language: "EN",
        companyUrl: "JD3T2-QH36R-X7W2W-TR3XT",
      }
    );
    ResLg.subscribe((response: any) => {
      if (response?.data.success) {
        dispatch(
          setToken({
            token: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
          })
        );
      }
    });
    return ResLg;
  };

export const loginAAD =
  (username: string, idToken: string) => async (dispatch: AppDispatch) => {
    const ResLgAAD = api.post(
      `${process.env.REACT_APP_PREFIX_API}/authen/azure-token`,
      {
        username,
        idToken,
      }
    );
    ResLgAAD.subscribe((response: any) => {
      dispatch(
        setToken({
          token: response?.data.data.accessToken,
          refreshToken: response?.data.data.refreshToken,
          aadToken: idToken,
        })
      );
    });
    return ResLgAAD;
  };

export const getProfile = () => (dispatch: AppDispatch) => {
  const ResGetProfile = api.get(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/account/account-info`
  );
  ResGetProfile.subscribe((response: any) => {
    if (response?.data.success) {
      dispatch(setProfile(response.data.data));
    }
  });
  return ResGetProfile;
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setToken({ token: "", refreshToken: "" }));
  dispatch(clearProfile());
  dispatch(logoutReducer());
};

export const updateUserPassword =
  (data: UpdatePasswordDTO) => (dispatch: AppDispatch) => {
    return api.post(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/Account/change-password`,
      data
    );
  };

export const updateUserProfile =
  (data: UserProfile) => (dispatch: AppDispatch) => {
    const ResUpdate = api.put(
      `${process.env.REACT_APP_PREFIX_API}/api/v1/account/update-profile`,
      data
    );

    ResUpdate.subscribe((response: any) => {
      if (response?.data.success) {
        dispatch(updateProfile(response));
      }
    });
    return ResUpdate;
  };

export const uploadAvatar = (data: any) => (dispatch: AppDispatch) => {
  const ResUpload = api.post(
    `${process.env.REACT_APP_PREFIX_API}/api/v1/file/avatar/upload`,
    data
  );

  ResUpload.subscribe((response: any) => {
    if (response?.data.success) {
      dispatch(updateAvatar(response));
    }
  });
};

export const getAccessMenu = (id: number) => {
  return api.get(
    `${process.env.REACT_APP_PREFIX_API}/core/v1/FunctionGroup/AccessMenu/${id}`
  );
};
