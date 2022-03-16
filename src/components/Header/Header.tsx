import {
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import { logout } from "../../services/AccountService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Menu from "../Menu/Menu";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ContactlessOutlinedIcon from "@mui/icons-material/ContactlessOutlined";
import { colors } from "../../utils/colors";

const useStyles = makeStyles({
  boxSearch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {},
  boxActionHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  iconAction: {
    cursor: "pointer",
    color: "white",
    fontSize: "30px",
  },
});

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account?.info);
  const classes = useStyles();

  const onLogout = () => {
    dispatch(logout());
  };

  // account menu state
  const [anchorElAccount, setAnchorElAccount] =
    React.useState<null | HTMLElement>(null);
  const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  // Option menu state

  const [anchorElOption, setAnchorElOption] =
    React.useState<null | HTMLElement>(null);

  const handleCloseOption = () => {
    setAnchorElOption(null);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
    handleCloseAccount();
    handleCloseOption();
  };

  return (
    <Box
      id="header-box"
      sx={{
        p: 1,
        height: "4.0625rem",
        width: "100%",
        boxShadow: "0 1px 1px 1px rgb(18 106 211 / 8%)",
        background: colors.bgColorHeader,
  
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={6}></Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box className={classes.boxActionHeader}>
            <ChangeLanguage />
            <Tooltip title={t(`header.notification`) as string}>
              <IconButton sx={{ mx: 1 }}>
                <NotificationsNoneOutlinedIcon className={classes.iconAction} />
              </IconButton>
            </Tooltip>

            <Tooltip title={t(`header.account`) as string}>
              <IconButton onClick={handleClickAccount} sx={{ mx: 1 }}>
                <AccountCircleIcon className={classes.iconAction} />
              </IconButton>
            </Tooltip>

            {/* Account Menu */}
            <Menu anchorEl={anchorElAccount} handleClose={handleCloseAccount}>
              <Box>
                <Stack
                  sx={{ p: 2 }}
                  direction={{ xs: "row" }}
                  spacing={{ xs: 2 }}
                  alignItems="center"
                >
                  <AccountCircleIcon
                    sx={{ fontSize: 40, color: colors.primaryColor }}
                  />
                  <Stack direction={{ xs: "column" }}>
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
                    <MenuItem
                      onClick={() => handleNavigate("/account-settings")}
                    >
                      <ListItemIcon>
                        <SettingsOutlinedIcon
                          fontSize="small"
                          sx={{ color: colors.primaryColor }}
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
                          sx={{ color: colors.primaryColor }}
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

            {/* Option Menu */}
            <Menu
              anchorEl={anchorElOption}
              handleClose={handleCloseOption}
              hiddenPadding={true}
            >
              <Box>
                <Grid container sx={{ width: 260, height: 260 }}>
                  <Grid item xs={6} sx={{ height: "50%" }}>
                    <MenuItem
                      sx={{
                        height: "100%",
                        width: "100%",
                        border: "1px solid #f0f6ff",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        sx={{ width: "100%" }}
                      >
                        <EmailOutlinedIcon
                          sx={{ color: "#788dbb", fontSize: 36 }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#788dbb" }}
                        >
                          Email
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Grid>
                  <Grid item xs={6} sx={{ height: "50%" }}>
                    <MenuItem
                      sx={{
                        height: "100%",
                        width: "100%",
                        border: "1px solid #f0f6ff",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 1 }}
                        sx={{ width: "100%" }}
                      >
                        <ChatBubbleOutlineOutlinedIcon
                          sx={{ color: "#788dbb", fontSize: 36 }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#788dbb" }}
                        >
                          {t("header.message")}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Grid>
                  <Grid item xs={6} sx={{ height: "50%" }}>
                    <MenuItem
                      sx={{
                        height: "100%",
                        width: "100%",
                        border: "1px solid #f0f6ff",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 1 }}
                        sx={{ width: "100%" }}
                      >
                        <ContactlessOutlinedIcon
                          sx={{ color: "#788dbb", fontSize: 36 }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#788dbb" }}
                        >
                          {t("header.contact")}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Grid>
                  <Grid item xs={6} sx={{ height: "50%" }}>
                    <MenuItem
                      sx={{
                        height: "100%",
                        width: "100%",
                        border: "1px solid #f0f6ff",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 1 }}
                        sx={{ width: "100%" }}
                      >
                        <EventOutlinedIcon
                          sx={{ color: "#788dbb", fontSize: 36 }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#788dbb" }}
                        >
                          {t("header.calendar")}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Grid>
                </Grid>
              </Box>
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
