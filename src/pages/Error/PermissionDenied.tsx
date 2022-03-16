import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const PermissionDenied = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box className="title">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
          {t("menu.error_permission_denied")}
        </Typography>
      </Box>
      <Box className="content">
        <Typography component="h2" variant="h6">
          {t("message_error.error_permission_denied")}
        </Typography>
      </Box>
    </Box>
  );
};

export default PermissionDenied;
