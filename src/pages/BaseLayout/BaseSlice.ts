import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKey } from "configs/consts";

const usersAdapter = createEntityAdapter();

export interface PageUrl {
  title: string;
  url?: string;
}
interface IBaseSlice {
  locale?: string;
  setErrorApi?: {
    status: number | string;
    statusText: string;
  };
  loading: boolean;
  pageUrl?: PageUrl[];
}

const initialState: IBaseSlice = usersAdapter.getInitialState({
  loading: false,
  locale: localStorage.getItem(LocalStorageKey.LANGUAGE) ?? "1",
  pageUrl: []
})

export const setLocale: any = createAsyncThunk("base/setLocale", (locale: string, { rejectWithValue }) => {
  try {
    return locale;
  } catch {
    return rejectWithValue("Set Locale: Error!")
  }
})

export const setErrorApi: any = createAsyncThunk("base/setErrorApi", (errorData: any, { rejectWithValue }) => {
  try {
    return errorData;
  } catch {
    return rejectWithValue("Set content error: Error!")
  }
});

export const setPageUrl: any = createAsyncThunk("base/pageUrl", (pageUrl: PageUrl, { rejectWithValue }) => {
  try {
    return pageUrl;
  } catch {
    return rejectWithValue("Set page name error: Error!")
  }
})


const baseSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [setErrorApi.pending]: (state) => {
      state.loading = true
    },

    [setErrorApi.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.setErrorApi = payload;
    },

    [setErrorApi.rejected]: (state) => {
      state.loading = false
    },

    [setLocale.pending]: (state) => {
      state.loading = true
    },

    [setLocale.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.locale = payload;
    },

    [setLocale.rejected]: (state) => {
      state.loading = false
    },

    [setPageUrl.pending]: (state) => {
      state.loading = true
    },

    [setPageUrl.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.pageUrl = payload;
    },

    [setPageUrl.rejected]: (state) => {
      state.loading = false
    },

  }
})

export default baseSlice.reducer