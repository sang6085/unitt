import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { setErrorApi } from "../../pages/BaseLayout/ConfigSlice";
import { useAppDispatch } from "../../stores/Store";

interface IPAlert {
  status?: number,
  content?: string;
}

const AlertComponent: React.FC<IPAlert> = ({ content, status }) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const closeAlert = () => {
    dispatch(setErrorApi(null));
  };
  return (
    <Alert onClose={closeAlert} severity="error">
      <AlertTitle>{t(`alert.error`)} - {t(`alert.status`)}: {status}</AlertTitle>
      {content}
    </Alert>
  );
};

export default AlertComponent;
