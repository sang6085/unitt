import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Drawer,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../Contexts/ThemeContext";
import Logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ChooseLayout from "../ChooseLayout.tsx/ChooseLayout";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
interface IBoxedSidebar {
  headerHeight: number;
  drawerWidth: number;
  listMenu: any;
  pageName: string;
}
const useStyles = makeStyles({
  button: {},
  selected: (props: { color: string; theme: string }) => {
    return {
      borderRadius: "10px !important",
      boxShadow:
        props.theme !== "dark"
          ? "rgba(165, 165, 165, 0.8) 0px 2px 4px, rgba(165, 165, 165, 0.3) 0px 1px 8px 0px"
          : "none",
      color: ` ${props.color} !important`,
      background: props.theme === "dark" ? "#ffffff3d !important" : "none",
    };
  },
  sidebarTemp: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100vh",
    width: 260,
    zIndex: -1,
  },
  boxIcon: (props: { color: string; theme: string }) => {
    return {
      height: "38px",
      width: "38px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: ` ${props.color} !important`,
      boxShadow:
        props.theme !== "dark"
          ? "rgba(165, 165, 165, 0.8) 0px 2px 4px, rgba(165, 165, 165, 0.3) 0px 1px 8px 0px"
          : "none",
    };
  },
  selectedBoxIcon: (props: { color: string }) => {
    return {
      height: "38px",
      width: "38px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: ` ${props.color} !important`,
    };
  },
  text: {
    fontSize: "15px !important",
  },
  selectedText: (props: { color: string }) => {
    return {
      color: `${props.color} !important`,
      fontSize: "15px !important",
      fontWeight: "bold",
    };
  },
});
const BoxedSidebar = (props: IBoxedSidebar) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { headerHeight, drawerWidth, listMenu, pageName } = props;
  const useThemeContext = useTheme();

  const classes = useStyles({
    color: useThemeContext.colorTheme,
    theme: useThemeContext.modeTheme,
  });

  const listDataLayout = [
    { title: "boxed", name: "Boxed sidebar" },
    { title: "collapsed", name: "Collapse sidebar" },
    { title: "topNav", name: "Top navigation" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          background: useThemeContext.navTheme,
        },
      }}
      open
    >
      <div data-name="menu">
        {/* Logo */}
        <Box
          sx={{
            position: "fixed",
            height: headerHeight + 16,
            width: drawerWidth,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Logo} alt="logo" style={{ width: 150, height: 45 }} />
        </Box>
        <Box
          sx={{
            marginTop: `calc(${headerHeight}px + 16px)`,
            height: `calc(100vh - ${headerHeight}px - 16px)`,
            overflowY: "hidden",
            "&:hover":{
              overflowY: "auto",
            }
          }}
        >
          <ChooseLayout listData={listDataLayout} />
          <Typography sx={{ fontWeight: "bold", fontSize: "12px", mx: 2.5, mb: 1, mt: 3 }}>
            {" "}
            {t(`menu.dashboard`).toLocaleUpperCase()}{" "}
          </Typography>
          <List sx={{ px: 2 }}>
            {listMenu.map((items: any, index: number) => (
              <React.Fragment key={index}>
                {index !== 0 && <Divider />}
                {items.children?.map((item: any) => (
                  <ListItem
                    button
                    onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                    key={item.id}
                    className={
                      pageName === item.url || pageName === `/${item.code.toLowerCase()}`
                        ? classes.selected
                        : classes.button
                    }
                  >
                    <ListItemIcon>
                      {pageName === item.url || pageName === `/${item.code.toLowerCase()}` ? (
                        item.code.toLowerCase() === "dashboard" ? (
                          <Box className={classes.selectedBoxIcon}>
                            <DashboardIcon sx={{ color: "#fff" }} />
                          </Box>
                        ) : item.code.toLowerCase() === "invitation" ? (
                          <Box className={classes.selectedBoxIcon}>
                            <MarkEmailReadIcon sx={{ color: "#fff" }} />
                          </Box>
                        ) : item.code.toLowerCase() === "roles_management" ? (
                          <Box className={classes.selectedBoxIcon}>
                            <AdminPanelSettingsIcon sx={{ color: "#fff" }} />
                          </Box>
                        ) : item.code.toLowerCase() === "attendance_list" ? (
                          <Box className={classes.selectedBoxIcon}>
                            <CheckCircleRoundedIcon sx={{ color: "#fff" }} />
                          </Box>
                        ) : (
                          <Box className={classes.selectedBoxIcon}>
                            <Icon
                              baseClassName="fas"
                              className={item.icon}
                              sx={{ color: "#fff" }}
                            />
                          </Box>
                        )
                      ) : item.code.toLowerCase() === "dashboard" ? (
                        <Box className={classes.boxIcon}>
                          <DashboardIcon />
                        </Box>
                      ) : item.code.toLowerCase() === "invitation" ? (
                        <Box className={classes.boxIcon}>
                          <MarkEmailReadIcon />
                        </Box>
                      ) : item.code.toLowerCase() === "roles_management" ? (
                        <Box className={classes.boxIcon}>
                          <AdminPanelSettingsIcon />
                        </Box>
                      ) : item.code.toLowerCase() === "attendance_list" ? (
                        <Box className={classes.boxIcon}>
                          <CheckCircleRoundedIcon />
                        </Box>
                      ) : (
                        <Box className={classes.boxIcon}>
                          <Icon baseClassName="fas" className={item.icon} />
                        </Box>
                      )}
                    </ListItemIcon>
                    <ListItemText
                    // primary={t(`menu.${item.code.toLowerCase()}`)}
                    // primary={item.code.toLowerCase()}
                    // className={useThemeContext.navTheme && classes.textNav}
                    >
                      <Box
                        className={
                          pageName === item.url || pageName === `/${item.code.toLowerCase()}`
                            ? classes.selectedText
                            : classes.text
                        }
                      >
                        {t(`menu.${item.code.toLowerCase()}`)}
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </div>
    </Drawer>
  );
};

export default BoxedSidebar;
