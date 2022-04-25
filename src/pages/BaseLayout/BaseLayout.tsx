import { useEffect, useState, ReactNode, FC, Fragment } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import DrawerMobile from "@mui/material/Drawer";
import MuiAppBar, {
  AppBarProps as MuiIAppBarProps,
} from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderComponent from "components/Header/Header";
import { menu } from "configs/consts";
import { Stack } from "@mui/material";
import { useStyles } from "pages/BaseLayout/BaseLayoutStyles";
import { useAuth } from "contexts/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";

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

interface IAppBarProps extends MuiIAppBarProps {
  open?: boolean;
  drawerwidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IAppBarProps>(({ theme, open, drawerwidth }) => ({
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
  }),
  ...(!open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
  }),
}));

interface DrawerProps {
  open?: boolean;
  drawerwidth: number;
}

interface IBaseLayout {
  children: ReactNode;
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

export const sidebarWidthOpen = 250;
export const sidebarWidthClose = 60;

const BaseLayout: FC<IBaseLayout> = (props) => {
  const classes = useStyles();
  const { children } = props;
  const auth = useAuth();

  const status = localStorage.getItem("statusSidebar");

  const [openMenu, setOpenMenu] = useState(status || "open");
  const [openTemp, setOpenTemp] = useState<boolean>(false);

  const mobileOpen = useMediaQuery("(max-width:992px)");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleDrawerWidth = () => {
    if (mobileOpen) {
      return sidebarWidthOpen;
    } else
      return openMenu === "open" || openTemp
        ? sidebarWidthOpen
        : sidebarWidthClose;
  };

  const handleMarginLeft = () => {
    if (mobileOpen) {
      return -1;
    } else return openMenu === "open" ? sidebarWidthOpen : sidebarWidthClose;
  };
  const drawerwidth = handleDrawerWidth();

  const marginLeft = handleMarginLeft();

  const hasAccessMenu = () => {
    return !!auth.accessMenu.length; // get access menu from user id
  };

  const handleDrawerOpen = () => {
    setOpenMenu("open");
    localStorage.setItem("statusSidebar", "open");
  };

  const handleDrawerClose = () => {
    if (mobileOpen) {
      setIsMobile(true);
    } else {
      setOpenMenu("close");
      localStorage.setItem("statusSidebar", "close");
    }
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
  const handleDrawerToggle = () => {
    setIsMobile(!isMobile);
  };

  useEffect(() => {
    setIsMobile(false);
  }, [mobileOpen]);

  const renderLayout = () => {
    if (auth.loading) {
    } else {
      if (!hasAccessMenu()) {
        return <Box>{children}</Box>;
      } else {
        return (
          <Stack direction="row">
            <CssBaseline />
            <AppBar
              position="fixed"
              open={openMenu === "open" || openTemp}
              drawerwidth={marginLeft}
              className={
                openMenu === "open"
                  ? classes.transitionAppBarOpen
                  : classes.transitionAppBarClose
              }
            >
              <HeaderComponent
                open={openMenu === "open" || openTemp}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                handleMenu={openMenu}
                mobileOpen={mobileOpen}
              />
            </AppBar>
            {mobileOpen ? (
              <DrawerMobile
                variant="temporary"
                open={isMobile}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                className={classes.sidebarWidthOpen}
              >
                <Sidebar headerHeight={200} listMenu={menu} open={true} />
              </DrawerMobile>
            ) : (
              <Drawer
                variant="permanent"
                open={openMenu === "open" || openTemp}
                drawerwidth={drawerwidth}
                onMouseEnter={() => handleHoverOn()}
                onMouseLeave={() => handleHoverOut()}
                className={
                  mobileOpen ? classes.mobileClose : classes.mobileOpen
                }
              >
                <Sidebar
                  headerHeight={200}
                  listMenu={menu}
                  open={openMenu === "open" || openTemp}
                />
              </Drawer>
            )}

            <WrapperMain
              open={openMenu === "open" || openTemp}
              drawerwidth={marginLeft}
              className={classes.transitionWrapperMain}
            >
              {children}
            </WrapperMain>
          </Stack>
        );
      }
    }
  };
  return <Fragment>{renderLayout()}</Fragment>;
};

export default BaseLayout;
