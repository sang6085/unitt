import { Observable } from "rxjs";
import { AppDispatch } from "../stores/Store";
import { setToken, logout as logoutReducer } from "../pages/Login/LoginSlice";

import { UpdatePasswordDTO } from "../pages/Login/LoginInterface";

import {
  updateProfile,
  updateAvatar,
  clearProfile,
  setProfile,
} from "../pages/AccountSettings/AccountSlice";
import { UserProfile } from "../pages/AccountSettings/AccountInterface";

import api from "../api/common";

export const login =
  ({ username, password }: { username: string; password: string }) =>
  (dispatch: AppDispatch) => {
    const ResLg = api.get(`${process.env.REACT_APP_PREFIX_API3}/login`);
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
      `${process.env.REACT_APP_PREFIX_API3}/authen/azure-token`,
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
  const resGetProfile = new Observable((subscriber) => {
    api
      .get(`${process.env.REACT_APP_PREFIX_API3}/get-profile`)
      .subscribe((response: any) => {
        if (response?.data.success) {
          dispatch(setProfile(response.data.data));
        }
        subscriber.next(response)
      });
  });
  return resGetProfile
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
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-access-menu`);
};

export const getAccountSettingMock = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-account-setting`);
}

export const getAccountListMock = () => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/list-account`);
}

export const getAccountByIdMock = (userId: number) => {
  return api.get(`${process.env.REACT_APP_PREFIX_API3}/get-account-byid`);
};