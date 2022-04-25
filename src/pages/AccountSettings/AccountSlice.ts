import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { IBaseResponse } from "api/common";
import { IUserInfo, IUserProfile } from "pages/AccountSettings/AccountInterface";

const usersAdapter = createEntityAdapter();

interface IProfileSlice {
    info?: IUserInfo;
    loading: boolean;
}

const initialInfo = {
  accountId: -1,
  userName: "",
  fullName: "",
  avatarUrl: "",
  fingerprint: "", 
  locationInfo: "",
  language: "vi",
}

const initialState: IProfileSlice  = usersAdapter.getInitialState({
  info: initialInfo,
  loading: false,
});

// Action

export const setProfile: any = createAsyncThunk("profile/setProfile", (data: IUserInfo, { rejectWithValue }) => {
  try{
    return data;
  }catch{
    return rejectWithValue('Set profile: Error!')
  }
});

export const clearProfile: any = createAsyncThunk("profile/clearProfile", () => {
  return initialInfo;
})

export const updateProfile: any = createAsyncThunk(
  "user/updateProfile",
  (newProfile: IBaseResponse<IUserProfile>) => {
    return newProfile.data;
  }
);

export const updateAvatar: any = createAsyncThunk("profile/updateAvatar", (data: any) => {
  return data;
});

const AccountSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // SetProfile

    [setProfile.pending]:(state) =>{
      state.loading = true
    },

    [setProfile.fulfilled]: (state, { payload }) => {
      state.info = payload;
    },

    [setProfile.rejected]: (state) => {
      state.loading = false
    },

    // Clear Profile
    
    [clearProfile.pending]:(state) =>{
      state.loading = true
    },

    [clearProfile.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.info = payload;
    },

    // UpdateProfile

    [updateProfile.pending]: (state) =>{
      state.loading = true
    },

    [updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false
      const newProfile: any = {
        ...state.info,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        phoneNumber: payload?.phoneNumber,
        fullName: `${payload?.lastName} ${payload?.firstName}`,
      };
      state.info = newProfile;
    },

    [updateProfile.rejected]:(state) =>{
      state.loading = false
    },

    //UpdateAvatar

    [updateAvatar.pending]: (state)=>{
      state.loading = true
    },

    [updateAvatar.fulfilled]: (state, { payload }) => {
      state.loading = false
      const newInfo: any = {
        ...state.info,
        avatarUrl: payload.data.fileName,
      };
      state.info = newInfo;
    },

    [updateAvatar.rejected]: (state) =>{
      state.loading = false
    }
  },
});

export default AccountSlice.reducer;
