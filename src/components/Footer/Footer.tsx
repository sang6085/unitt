import { Box } from "@mui/material";
import React from "react";
// import { useTranslation } from "react-i18next";
// import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";

const Footer = () => {
  //   const { t } = useTranslation();
  return (
    <Box sx={{ position: "fixed", bottom: 5, right: 20 }} data-name="translate">
      {/* <ChangeLanguage /> */}
    </Box>
  );
};

export default Footer;
