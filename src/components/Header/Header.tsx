import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useAppDispatch, useAppSelector } from "stores/Store";
import ChangeLanguage from "components/ChangeLanguage/ChangeLanguage";
import { logout } from "services/AccountService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Menu from "components/Menu/Menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useStyles } from "components/Header/HeaderStyles";
import { CommonStyles } from "utils/styles";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Fragment, useState, FC, MouseEvent} from "react";
import { colors } from "configs/consts";
// import { loadAnimation } from "lottie-web";
// import { defineLordIconElement } from "lord-icon-element";

// register lottie and define custom element
// defineLordIconElement(loadAnimation);

interface IHeader {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  handleMenu?: boolean | string;
  mobileOpen?: boolean | false;
}

const Header: FC<IHeader> = (props) => {
  const { t } = useTranslation();
  const { handleMenu, mobileOpen } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account?.info);
  const classes = useStyles();
  const styles = CommonStyles();

  const onLogout = () => {
    dispatch(logout());
  };

  // account menu state
  const [anchorElAccount, setAnchorElAccount] =
    useState<null | HTMLElement>(null);
  const handleClickAccount = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  // Option menu state

  const handleNavigate = (url: string) => {
    navigate(url);
    handleCloseAccount();
  };

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems="center"
      id="header-box"
      className={classes.headerBox}
      py="4px"
      px="12px"
    >
      <Stack
        direction={"row"}
        alignItems="center"
        sx={{
          overflowY: "auto",
        }}
      >
        {mobileOpen ? (
          <IconButton onClick={() => props.handleDrawerClose()}>
          <MenuIcon className={styles.icons} />
        </IconButton>
        ) : handleMenu === "close" ? (
          <IconButton onClick={() => props.handleDrawerOpen()}>
            <MenuOpenIcon className={styles.icons} />
          </IconButton>
        ) : (
          <IconButton onClick={() => props.handleDrawerClose()}>
            <MenuIcon className={styles.icons} />
          </IconButton>
        )}
        <Typography variant="h6" ml={1}>
          UNIT CORP
        </Typography>
      </Stack>
      <Box className={classes.boxActionHeader}>
        <ChangeLanguage />
        <Fragment>
          <Tooltip title={t(`header.notification`) as string}>
            <IconButton className={classes.iconBtn}>
              <NotificationsOutlinedIcon className={styles.icons} />
            </IconButton>
          </Tooltip>

          <Tooltip title={t(`header.account`) as string}>
            <IconButton
              onClick={handleClickAccount}
              className={classes.iconBtn}
            >
              <AccountCircleIcon className={styles.icons} />
            </IconButton>
          </Tooltip>
        </Fragment>

        {/* Account Menu */}
        <Menu anchorEl={anchorElAccount} handleClose={handleCloseAccount}>
          <Box>
            <Stack p={2} direction="row" spacing={2} alignItems="center">
              <AccountCircleIcon className={classes.avatar} />
              <Stack direction={"column"}>
                <Typography variant="subtitle1" color={colors.defaultColor}>
                  {account?.fullName}
                </Typography>
                <Typography variant="caption" color={colors.defaultColor}>
                  {account?.email}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack>
              <MenuList>
                <MenuItem onClick={() => handleNavigate("/account-settings")}>
                  <ListItemIcon>
                    <SettingsOutlinedIcon
                      fontSize="small"
                      className={classes.iconMenu}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">
                      {t("header.account_settings")}
                    </Typography>
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Stack>
            <Divider />
            <Stack>
              <MenuList>
                <MenuItem onClick={onLogout}>
                  <ListItemIcon>
                    <LockOpenOutlinedIcon
                      fontSize="small"
                      className={classes.iconMenu}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">
                      {t("header.sign_out")}
                    </Typography>
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Stack>
          </Box>
        </Menu>
      </Box>
    </Stack>
  );
};

export default Header;
