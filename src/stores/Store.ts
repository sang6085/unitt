import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import loginReducer from "../pages/Login/LoginSlice";
import profileReducer from "../pages/Profile/ProfileSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ConfigSlice from "../pages/BaseLayout/ConfigSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    config: ConfigSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type storeType = typeof store;
