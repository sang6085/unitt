import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import React from "react";
import ThemePanelComponent from "../ThemePanel/ThemePanel";
import NotificationMenu from "./NotificationMenu";
import { useAppSelector } from "../../stores/Store";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "../../Contexts/ThemeContext";
import { grey } from "@mui/material/colors";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import Search from "../Search/Search";
import AccountMenu from "./AccountMenu";




const TopNav = () => {
  const { t } = useTranslation();
  const themeContext = useTheme();
  const userProfile = useAppSelector((state) => state.profile?.info);
  const [openTheme, setOpenTheme] = React.useState<boolean>(false);
  const [anchorElAccount, setAnchorElAccount] = React.useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorElAccount);
  const [anchorElNotification, setAnchorNotification] = React.useState<null | HTMLElement>(null);
  const openNotification = Boolean(anchorElNotification);

  const [openSearch, setOpenSearch] = React.useState(false);

  const handleClickOpen = () => {
    setOpenSearch(true);
  };

  const handleClose = () => {
    setOpenSearch(false);
  };

  const toggleDrawer = (open: boolean) => {
    setOpenTheme(open);
  };

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  const handleClickNotification = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorNotification(null);
  };

  const modeTheme = themeContext.layout === "topNav" ? "dark" : themeContext.modeTheme;
  let theme = createTheme({
    typography: {
      fontFamily: themeContext.fontFamily,
    },
    palette: {
      primary: {
        main: themeContext.colorTheme,
      },
      ...(modeTheme === "light" && {
        background: {
          default: "#fbfafb",
        },
      }),
      mode: modeTheme,
      text: {
        ...(modeTheme === "light"
          ? {
              primary: grey[800],
            }
          : {
              primary: grey[400],
            }),
      },
    },
  });

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
      }}
    >
      {/* Search TextField */}
      <ThemeProvider theme={theme}>
        <IconButton onClick={handleClickOpen}>
          <SearchIcon />
        </IconButton>
        <Search open={openSearch} onClose={handleClose} />
        {/* <Search /> */}

        {/* Account Menu */}
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Tooltip title={`${t("menu.profile")}`}>
              <IconButton onClick={handleClickAccount} size="small">
                <Avatar
                  alt={userProfile?.firstName}
                  src={userProfile?.avatarUrl}
                  sx={{ width: 38, height: 38 }}
                />
              </IconButton>
            </Tooltip>

            <Typography
              component="span"
              sx={{
                px: 1,
                fontSize: 14,
                fontWeight: 600,
                color: themeContext.layout === "topNav" ? "#fff" : "'none",
              }}
            >
              {userProfile?.fullName}
            </Typography>
          </Box>
          {/* Notification Menu */}

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ml: 3,
              mr: -1,
            }}
          >
            <ChangeLanguage />
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mx: 3,
            }}
          >
            <Tooltip title={`${t("menu.notifications")}`}>
              <IconButton onClick={handleClickNotification} size="small">
                <NotificationsOutlinedIcon sx={{ width: 35, height: 35 }} />
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                position: "absolute",
                background: "#3295f6",
                fontSize: 10,
                p: 0.5,
                color: "#fff",
                borderRadius: "50%",
                top: "-6px",
                right: "-2px",
              }}
            >
              12
            </Box>
          </Box>
          {/* Theme Menu */}
          <Tooltip title={`${t("menu.themeSettings")}`}>
            <IconButton onClick={() => toggleDrawer(true)} size="small">
              <ColorLensOutlinedIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </ThemeProvider>
      
      <ThemePanelComponent open={openTheme} toggleDrawer={toggleDrawer} />
      
      <AccountMenu open={openAccount} anchorEl={anchorElAccount} handleClose={handleCloseAccount} />
      
      <NotificationMenu
        open={openNotification}
        anchorEl={anchorElNotification}
        handleClose={handleCloseNotification}
      />
    </Box>
  );
};

export default TopNav;
