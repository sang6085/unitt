import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKey } from "../../configs/consts";

const usersAdapter = createEntityAdapter();

interface IPConfigSlice{
  locale?: string;
  setErrorApi?: {
    status: number | string;
    statusText: string;
  };
  loading: boolean;
}

const initialState: IPConfigSlice = usersAdapter.getInitialState({
  loading: false,
  locale: localStorage.getItem(LocalStorageKey.LANGUAGE) ?? "1",
})

export const setLocale: any = createAsyncThunk("user/setLocale",  (locale: string, { rejectWithValue }) => {
  try{
    return locale;
  }catch{
    return rejectWithValue("Set Locale: Error!")
  }
})
export const setErrorApi: any = createAsyncThunk("user/setErrorApi", (errorData: any,  { rejectWithValue }) => {
  try{
    return errorData;
  }catch{
    return rejectWithValue("Set content error: Error!")
  }
});



const configSlice = createSlice({

  name: "config",
  initialState: initialState,
  reducers: {},
  extraReducers:{

    [setErrorApi.pending]:(state) =>{
      state.loading = true
    },
    [setErrorApi.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.setErrorApi = payload;
    },
    [setErrorApi.rejected]: (state) =>{
      state.loading = false
    },


    [setLocale.pending]:(state) =>{
      state.loading = true
    },
    [setLocale.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.locale = payload;
    },
    [setLocale.rejected]: (state) =>{
      state.loading = false
    },
  }
})

export default configSlice.reducer