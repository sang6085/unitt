import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const NotFount = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {t("menu.not_found")}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFount;
