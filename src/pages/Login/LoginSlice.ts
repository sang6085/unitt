import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { LocalStorageKey } from "configs/consts";
import { ILoginSliceState } from "pages/Login/LoginInterface";

const usersAdapter = createEntityAdapter();

const initialState: ILoginSliceState = usersAdapter.getInitialState({
  authToken: {
    accessToken: localStorage.getItem(LocalStorageKey.TOKEN) ?? "",
    refreshToken: localStorage.getItem(LocalStorageKey.REFRESH_TOKEN) ?? "",
  },
  aadToken: localStorage.getItem(LocalStorageKey.AAD_TOKEN) ?? "",
  notifications: {
    totalData: 0,
    totalUnread: 0,
    datas: [],
  },
  loading: false,
});

// Action

export const setToken: any = createAsyncThunk(
  "user/setToken",
  (
    tokens: { token: string; refreshToken: string; aadToken?: string },
    { rejectWithValue }
  ) => {
    try {
      const authToken = {
        accessToken: tokens.token,
        refreshToken: tokens.refreshToken,
      };
      const aadToken = tokens.aadToken ?? "";
      localStorage.setItem(LocalStorageKey.TOKEN, tokens.token);
      localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, tokens.refreshToken);
      localStorage.setItem(LocalStorageKey.AAD_TOKEN, aadToken);
      localStorage.setItem("statusSidebar", "open")
      return { authToken, aadToken };
    } catch {
      return rejectWithValue("Set token: Error!");
    }
  }
);

export const logout: any = createAsyncThunk("user/logout", () => {
  return initialState;
});

const userSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [setToken.pending]: (state) => {
      state.loading = true;
    },
    [setToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authToken = payload.authToken;
      state.aadToken = payload.aadToken;
    },
    [setToken.rejected]: (state) => {
      // console.log(action.payload);
      state.loading = false;
    },

    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state = payload;
    },
    [logout.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
