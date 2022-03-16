import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { LocalStorageKey } from "../../configs/consts";
import { BaseResponse } from "../../interfaces/BaseResponse";
import {
  UserDashboardSetting,
  UserInfo,
  UserProfile,
  UserSliceState,
} from "./LoginInterface";

const usersAdapter = createEntityAdapter();

const initialState: UserSliceState = usersAdapter.getInitialState({
  authToken: {
    accessToken: localStorage.getItem(LocalStorageKey.TOKEN) ?? "",
    refreshToken: localStorage.getItem(LocalStorageKey.REFRESH_TOKEN) ?? "",
  },
  aadToken: localStorage.getItem(LocalStorageKey.AAD_TOKEN) ?? "",
  locale: localStorage.getItem(LocalStorageKey.LANGUAGE) ?? "1",
  notifications: {
    totalData: 0,
    totalUnread: 0,
    datas: [],
  },
  dashboardSettings: [],
});

// Action

export const setToken: any = createAsyncThunk(
  "user/setToken",
  async (tokens: {
    token: string;
    refreshToken: string;
    aadToken?: string;
  }) => {
    // console.log(tokens);
    const authToken = {
      accessToken: tokens.token,
      refreshToken: tokens.refreshToken,
    };
    const aadToken = tokens.aadToken ?? "";
    localStorage.setItem(LocalStorageKey.TOKEN, tokens.token);
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(LocalStorageKey.AAD_TOKEN, aadToken);
    return { authToken, aadToken };
  }
);

export const setProfile: any = createAsyncThunk(
  "user/setProfile",
  async (data: UserInfo) => {
    return data;
  }
);

export const setDashboardSettings: any = createAsyncThunk(
  "user/setDashboardSettings",
  async (data: UserDashboardSetting[]) => {
    return data;
  }
);

export const logout: any = createAsyncThunk("user/logout", async () => {
  return initialState;
});

export const setLocale: any = createAsyncThunk(
  "user/setLocale",
  async (locale: string) => {
    return locale;
  }
);

export const updateProfile: any = createAsyncThunk(
  "user/updateProfile",
  async (newProfile: BaseResponse<UserProfile>) => {
    return newProfile.data;
  }
);

export const updateAvatar: any = createAsyncThunk(
  "user/updateAvatar",
  async (data: any) => {
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [setToken.fulfilled]: (state, { payload }) => {
      state.authToken = payload.authToken;
      state.aadToken = payload.aadToken;
    },
    [setProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload;
    },
    [setDashboardSettings.fulfilled]: (state, { payload }) => {
      state.dashboardSettings = payload;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state = payload;
    },
    [setLocale.fulfilled]: (state, { payload }) => {
      state.locale = payload;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      const newProfile: any = {
        ...state.profile,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        phoneNumber: payload?.phoneNumber,
        fullName: `${payload?.lastName} ${payload?.firstName}`,
      };
      state.profile = newProfile;
    },
    [updateAvatar.fulfilled]: (state, { payload }) => {
      const newProfile: any = {
        ...state.profile,
        avatarUrl: payload.data.fileName,
      };
      state.profile = newProfile;
    },
  },
});

export default userSlice.reducer;
