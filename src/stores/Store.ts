import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import loginReducer from "../pages/Login/LoginSlice";
import AccountReducer from "../pages/AccountSettings/AccountSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import BaseSlice from "../pages/BaseLayout/BaseSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    account: AccountReducer,
    base: BaseSlice
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
