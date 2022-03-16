import { Box, List, ListItem, ListItemIcon, Icon, Drawer, Tooltip, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../Contexts/ThemeContext";
import Logo from "../../assets/images/logo_mini.png";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ChooseLayoutCollapse from "../ChooseLayout.tsx/ChooseLayoutCollapse";

interface ICollapseSidebar {
  headerHeight: number;
  drawerWidth: number;
  listMenu: any;
  pageName: string;
}

const useStyles = makeStyles({
  button: {
    padding: 12,
    borderRadius: 5,
  },
  selected: (props: { color: string }) => {
    return {
      background: ` ${props.color} !important`,
      // borderRadius: "16px !important",
      // color: "#FFF !important",
      padding: 12,
      borderRadius: 5,
    };
  },
  textNav: {
    color: "#fff",
  },
  buttonIcon: {
    borderRadius: "0% !important",
  },
});

const CollapseSidebar = (props: ICollapseSidebar) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { headerHeight, drawerWidth, listMenu, pageName } = props;
  const useThemeContext = useTheme();
  const classes = useStyles({
    color: useThemeContext.colorTheme,
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
      open={false}
    >
      <div data-name="menu" style={{ overflow: "hidden" }}>
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
          <img src={Logo} alt="logo" style={{ width: 50, height: 50 }} />
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
          <ChooseLayoutCollapse listData={listDataLayout} />
          <List
            sx={{
              px: 2,
            }}
          >
            {listMenu.map((items: any, index: number) => (
              <React.Fragment key={index}>
                {items.children?.map((item: any) => (
                  <ListItem onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")} sx={{ display: "content" }}>
                    <ListItemIcon>
                      {pageName === item.url || pageName === `/${item.code.toLowerCase()}` ? (
                        item.code.toLowerCase() === "dashboard" ? (
                          <Tooltip
                            title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                            placement="right"
                            arrow
                            onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                            className={classes.selected}
                          >
                            <IconButton className={classes.buttonIcon}>
                              <DashboardIcon sx={{ color: "#fff" }} />
                            </IconButton>
                          </Tooltip>
                        ) : item.code.toLowerCase() === "invitation" ? (
                          <Tooltip
                            title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                            placement="right"
                            arrow
                            onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                            className={classes.selected}
                          >
                            <IconButton className={classes.buttonIcon}>
                              <MarkEmailReadIcon sx={{ color: "#fff" }} />
                            </IconButton>
                          </Tooltip>
                        ) : item.code.toLowerCase() === "roles_management" ? (
                          <Tooltip
                            title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                            placement="right"
                            arrow
                            onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                            className={classes.selected}
                          >
                            <IconButton className={classes.buttonIcon}>
                              <AdminPanelSettingsIcon sx={{ color: "#fff" }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                            placement="right"
                            arrow
                            onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                            className={classes.selected}
                          >
                            <IconButton className={classes.buttonIcon}>
                              <Icon
                                baseClassName="fas"
                                className={item.icon}
                                sx={{ color: "#fff" }}
                                style={{ fontSize: "24px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )
                      ) : item.code.toLowerCase() === "dashboard" ? (
                        <Tooltip
                          title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                          placement="right"
                          arrow
                          onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                          className={classes.button}
                        >
                          <IconButton className={classes.buttonIcon}>
                            <DashboardIcon />
                          </IconButton>
                        </Tooltip>
                      ) : item.code.toLowerCase() === "invitation" ? (
                        <Tooltip
                          title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                          placement="right"
                          arrow
                          onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                          className={classes.button}
                        >
                          <IconButton className={classes.buttonIcon}>
                            <MarkEmailReadIcon />
                          </IconButton>
                        </Tooltip>
                      ) : item.code.toLowerCase() === "roles_management" ? (
                        <Tooltip
                          title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                          placement="right"
                          arrow
                          onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                          className={classes.button}
                        >
                          <IconButton className={classes.buttonIcon}>
                            <AdminPanelSettingsIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={`${t(`menu.${item.code.toLowerCase()}`)}`}
                          placement="right"
                          arrow
                          onClick={() => navigate(item.url !== "/" ? item.url : "/dashboard")}
                          className={classes.button}
                        >
                          <IconButton className={classes.buttonIcon}>
                            <Icon baseClassName="fas" className={item.icon} style={{ fontSize: "24px" }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </ListItemIcon>
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

export default CollapseSidebar;
