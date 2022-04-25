import { Stack, Typography } from "@mui/material";
import React from "react";
import { sidebarWidthClose, sidebarWidthOpen } from "pages/BaseLayout/BaseLayout";
import { useStyles } from "components/Footer/FooterStyles";
import logo from "assets/logo/unit_circle.png";

interface IFooter {
  open: boolean;
}

const Footer: React.FC<IFooter> = (props) => {
  //   const { t } = useTranslation();
  const classes = useStyles();
  const { open } = props;
  return (
    <Stack className={classes.container} width={open ? sidebarWidthOpen : sidebarWidthClose} direction="row" alignItems="center" justifyContent="center">
      <img src={logo} alt="img_footer" width={25} />
      {
        open
          ?
          <Typography variant="caption" sx={{ ml: 1 }}>2021 Proudly Made by UNIT Corp</Typography>
          : ""
      }
    </Stack>
  );
};

export default Footer;
