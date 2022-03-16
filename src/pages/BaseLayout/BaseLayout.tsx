import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
// import { menu } from "../../components/Sidebar/menu";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderComponent from "../../components/Header/Header";
import { menu } from "../../configs/consts";
import { useLocation } from "react-router";

const openedMixin = (theme: Theme, dw: any): CSSObject => ({
  width: dw,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme, dw: any): CSSObject => ({
  // width: 100,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${dw}px + 1px)`,
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerwidth }) => ({
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
  }),
  ...(!open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px - 1px)`,
  }),
}));

interface DrawerProps {
  open?: boolean;
  drawerwidth: number;
}

interface IBaseLayout {
  children: React.ReactNode;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open, drawerwidth }) => ({
  width: drawerwidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerwidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerwidth),
  }),
  ...(!open && {
    ...closedMixin(theme, drawerwidth),
    "& .MuiDrawer-paper": closedMixin(theme, drawerwidth),
  }),
}));

const WrapperMain = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open, drawerwidth }) => ({
  ...(open && { marginLeft: drawerwidth }),
  ...(!open && { marginLeft: drawerwidth }),
  width: "100%",
}));

const BaseLayout: React.FC<IBaseLayout> = (props) => {
  const { children } = props;
  const { pathname } = useLocation();

  const status = localStorage.getItem("statusSidebar");

  const [openMenu, setOpenMenu] = React.useState(status || "open");
  const [openTemp, setOpenTemp] = React.useState<boolean>(
    status === "open" ? true : false
  );

  const drawerwidth = openMenu === "open" || openTemp ? 250 : 60;

  const marginLeft = openMenu === "open" ? 250 : 60;

  const handleDrawerOpen = () => {
    setOpenMenu("open");
    localStorage.setItem("statusSidebar", "open");
  };

  const handleDrawerClose = () => {
    setOpenMenu("close");
    localStorage.setItem("statusSidebar", "close");
  };

  const handleHoverOn = () => {
    if (openMenu !== "open") {
      setOpenTemp(true);
    }
  };

  const handleHoverOut = () => {
    if (openMenu !== "open") {
      setOpenTemp(false);
    }
  };

  return (
    <React.Fragment>
      {pathname === "/login" || pathname === "/register" ? (
        <Box>{children}</Box>
      ) : (
        <Box sx={{ display: "flex", background: "#f0f6ff" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            open={openMenu === "open" || openTemp}
            sx={{ background: "none", zIndex: 999 }}
            drawerwidth={marginLeft}
          >
            <HeaderComponent />
          </AppBar>
          <Drawer
            variant="permanent"
            open={openMenu === "open" || openTemp}
            drawerwidth={drawerwidth}
            onMouseEnter={() => handleHoverOn()}
            onMouseLeave={() => handleHoverOut()}
            sx={{
              "& .css-13tlj9j-MuiPaper-root-MuiDrawer-paper": {
                borderRight: "inherit",
                position: "initial",
              },

              position: "fixed",
              zIndex: 1000,
            }}
          >
            <Sidebar
              headerHeight={200}
              listMenu={menu}
              open={openMenu === "open" || openTemp}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              handleMenu={openMenu}
            />
          </Drawer>
          <WrapperMain
            open={openMenu === "open" || openTemp}
            drawerwidth={marginLeft}
          >
            {children}
          </WrapperMain>
        </Box>
      )}
    </React.Fragment>
  );
};

export default BaseLayout;
