import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { getMenuAccount } from "../../services/MenuService";
// import { BrowserRouter, Route } from "react-router-dom";
import { useAppSelector } from "../../stores/Store";
import { AuthenticationToken } from "../Login/LoginInterface";
import { loadCSS } from "fg-loadcss";
import { Box, CssBaseline, Divider, IconButton } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTheme } from "../../Contexts/ThemeContext";
import BoxedSidebar from "../../components/Sidebar/BoxedSidebar";
import CollapseSidebar from "../../components/Sidebar/CollapseSidebar";
import TopNav from "../../components/Sidebar/TopNav";
import { makeStyles } from "@mui/styles";
import { VariantType, useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  topNavigation: {
    position: "absolute",
    display: "flex",
    height: 530,
    justifyContent: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    background: "rgba(54, 67, 163, 0.95)",
  },
  topNavBackground1: {
    background: "linear-gradient(135deg, rgb(107, 115, 255) 0%, rgb(0, 13, 255) 100%)",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.3,
    zIndex: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topNavBackground2: {
    backgroundSize: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.7,
    backgroundImage: "url(https://tokyo.bloomui.com/static/images/placeholders/covers/7.jpg)",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topNavBackground3: {
    backgroundSize: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
    backgroundImage: "url(https://tokyo.bloomui.com/static/images/placeholders/covers/2.jpg)",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topNavRender: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1328,
    height: 530,
    zIndex: 9,
  },
});

const BaseLayout = () => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const setErrorApi = useAppSelector((state) => state.config.setErrorApi);
  const authToken: AuthenticationToken | undefined = useAppSelector(
    (state) => state.login.authToken
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [menu, setMenu] = React.useState<any>();
  const useThemeContext = useTheme();

  // collapsed: 120, boxed: 300
  const drawerWidth =
    useThemeContext.layout === "collapsed" ? 120 : useThemeContext.layout === "boxed" ? 300 : 0;
  const headerHeight = useThemeContext.layout === "topNav" ? 200 : 100;
  const maxWidth = useThemeContext.layout === "topNav" ? 1280 : "100vw";

  React.useEffect(() => {
    const node = loadCSS("https://use.fontawesome.com/releases/v5.14.0/css/all.css");
    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  React.useEffect(() => {
    if (authToken?.accessToken) {
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
      getMenuAccount().subscribe((data: any) => {
        setMenu(data?.data.data);
        setLoading(false);
      })
    } else {
      navigate("/login");
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleClickVariant = (variant: VariantType) => {
    enqueueSnackbar(`${t(`alert.status`)}:${setErrorApi?.status} - ${setErrorApi?.statusText}`, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      action: (key) => (
        <IconButton aria-label="close" size="small" onClick={() => closeSnackbar(key)}>
          <CloseIcon fontSize="inherit" sx={{ color: "white" }} />
        </IconButton>
      ),
    });
  };

  React.useEffect(() => {
    setPageName("/" + location.pathname.slice(1));
  }, [navigate, location]);

  React.useEffect(() => {
    if (setErrorApi) {
      handleClickVariant("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setErrorApi]);

  return (
    <div style={{ overflowY: "auto" }}>
      {!loading ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {useThemeContext.layout === "topNav" ? (
            <Box
              className={styles.topNavigation}
              sx={{
                mx: { sm: 1, md: 4 },
                width: { sm: `calc(100% - 16px)`, md: `calc(100% - 64px)` },
              }}
            >
              <Box
                sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                  height: `${headerHeight}px`,
                  maxWidth: 1328,
                }}
              >
                <Box className={styles.topNavBackground1} />
                <Box className={styles.topNavBackground2} />
                <Box className={styles.topNavBackground3} />
                <Box className={styles.topNavRender}>
                  <Header />
                  <Divider sx={{ mx: 3, background: "#ffffff4a" }} />
                  <TopNav listMenu={menu} pageName={pageName} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                height: `${headerHeight}px`,
              }}
            >
              <Header />
              {/* <button onClick={() => handleClickVariant("error")}>Text</button> */}
            </Box>
          )}

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, overflowY: "scroll" }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            {useThemeContext.layout === "collapsed" ? (
              <CollapseSidebar
                headerHeight={headerHeight}
                drawerWidth={drawerWidth}
                listMenu={menu}
                pageName={pageName}
              />
            ) : useThemeContext.layout === "boxed" ? (
              <BoxedSidebar
                headerHeight={headerHeight}
                drawerWidth={drawerWidth}
                listMenu={menu}
                pageName={pageName}
              />
            ) : null}
          </Box>

          {useThemeContext.layout === "topNav" ? (
            <Box
              component="main"
              sx={{
                position: "absolute",
                zIndex: 99,
                width: "100%",
                display: "flex",
                marginTop: `${headerHeight}px`,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 3,
                  mx: { sm: 3, md: 6 },
                  mb: 2,
                  height: "auto",
                  width: "100%",
                  maxWidth: maxWidth,
                  boxShadow: 2,
                  borderRadius: 4,
                  background: useThemeContext.modeTheme === "light" ? "#f7f7f7" : "#0c0a0a",
                }}
              >
                <Outlet />
              </Box>
              <Footer />
            </Box>
          ) : (
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                marginTop: `${headerHeight}px`,
              }}
            >
              <Outlet />
              <Footer />
            </Box>
          )}
        </Box>
      ) : null}
    </div>
  );
};

export default BaseLayout;
