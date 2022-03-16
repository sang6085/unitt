import { Box, Button, Icon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import { useTheme } from "../../Contexts/ThemeContext";
import { LocalStorageKey } from "../../configs/consts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

interface ITopNav {
  listMenu: any;
  pageName: string;
}

const useStyles = makeStyles({
  button: {
    marginRight: "8px !important",
    padding: "16px 28px !important",
    borderRadius: "16px !important  ",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.1) !important" },
  },
});

const TopNav = (props: ITopNav) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const useThemeContext = useTheme();

  const listDataLayout = [
    { title: "boxed", name: "Boxed sidebar" },
    { title: "collapsed", name: "Collapse sidebar" },
    { title: "topNav", name: "Top navigation" },
  ];

  /* Menu Selector */

  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  /* Nav Selector */

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const openNav = Boolean(anchorElNav);
  const handleClickNav = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorElNav(null);
  };

  // onChangeLayout

  const handleChangeLayout = (val: string) => {
    localStorage.setItem(LocalStorageKey.LAYOUT, val);
    useThemeContext.setLayout(val === "boxed" || val === "collapsed" || val === "topNav" ? val : "boxed");
    handleCloseNav();
  };

  // onChangeLayout

  const handleChangePage = (url: string) => {
    navigate(url !== "/" ? url : "/dashboard")
    handleCloseMenu();
  };

  const { listMenu, pageName } = props;
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 100,
      }}
    >
      {listMenu.map((items: any, index: number) =>
        index === 0
          ? items.children.map((item: any) => (
              <Button
                key={item.id}
                sx={{
                  color: "#fff",
                  background:
                    pageName === item.url || pageName === `/${item.code.toLowerCase()}`
                      ? "rgba(255,255,255,0.1)"
                      : "none",
                }}
                startIcon={
                  item.code.toLowerCase() === "dashboard" ? (
                    <DashboardIcon sx={{ color: "#fff" }} />
                  ) : item.code.toLowerCase() === "invitation" ? (
                    <MarkEmailReadIcon sx={{ color: "#fff" }} />
                  ) : item.code.toLowerCase() === "roles_management" ? (
                    <AdminPanelSettingsIcon sx={{ color: "#fff" }} />
                  ) : (
                    <Icon baseClassName="fas" className={item.icon} />
                  )
                }
                className={styles.button}
                onClick={() => handleChangePage(item.url)}
              >
                {`${t(`menu.${item.code.toLowerCase()}`)}`}
              </Button>
            ))
          : null
      )}

      {/* Menu Selector */}
      <Button
        sx={{ color: "#fff", background: openMenu ? "rgba(255,255,255,0.1)" : "none" }}
        endIcon={openMenu ? <ExpandLess /> : <ExpandMore />}
        className={styles.button}
        onClick={handleClickMenu}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {listMenu.map((items: any, index: number) =>
          index !== 0
            ? items.children.map((item: any) => (
                <MenuItem
                  onClick={() => handleChangePage(item.url)}
                  sx={{
                    color:
                      pageName === item.url || pageName === `/${item.code.toLowerCase()}`
                        ? "rgb(85, 105, 255)"
                        : "none",
                  }}
                >
                  {item.code.toLowerCase() === "dashboard" ? (
                    <DashboardIcon sx={{ mr: 2 }} />
                  ) : item.code.toLowerCase() === "invitation" ? (
                    <MarkEmailReadIcon sx={{ mr: 2 }} />
                  ) : item.code.toLowerCase() === "roles_management" ? (
                    <AdminPanelSettingsIcon sx={{ mr: 2 }} />
                  ) : (
                    <Icon baseClassName="fas" className={item.icon} sx={{ mr: 2 }} style={{ fontSize: 24 }} />
                  )}
                  {`${t(`menu.${item.code.toLowerCase()}`)}`}
                </MenuItem>
              ))
            : null
        )}
      </Menu>

      {/* Nav Selector */}

      <Button
        sx={{ color: "#fff", background: openNav ? "rgba(255,255,255,0.1)" : "none" }}
        endIcon={openNav ? <ExpandLess /> : <ExpandMore />}
        className={styles.button}
        onClick={handleClickNav}
      >
        <FlipToFrontIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElNav}
        open={openNav}
        onClose={handleCloseNav}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {listDataLayout.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleChangeLayout(item.title)}
            sx={{ color: item.title === "topNav" ? "rgb(85, 105, 255)" : "none" }}
          >
            {t(`layout.${item.title}`)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TopNav;
