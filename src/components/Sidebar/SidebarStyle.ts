import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

export const useStyles: any = makeStyles({
  itemButton: {
    // background: "blue !important"
    marginBottom: "10px !important",
  },
  boxMenu: {
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: colors.bgColorMenu,
  },
  boxMenuClose: {
    overflowY: "hidden",
    background: colors.bgColorMenu,
  },
  dashboard: {
    fontSize: "14px !important",
  },
  logoOpen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "54px",
    backgroundColor: colors.bgColorHeader,
    boxShadow: "0 1px 1px 1px rgb(18 106 211 / 8%)",
  },
  logoClose: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "54px",
    backgroundColor: colors.bgColorHeader,
    boxShadow: "0 1px 1px 1px rgb(18 106 211 / 8%)",
    paddingLeft: "10px",
  },
  linkMenu: {
    color: colors.sidebarColor,
    display: "block",
    "&:hover": {
      color: colors.bgColorHeader,
    },
  },
  linkMenuActive: {
    color: `${colors.bgColorHeader} !important`,
    "&:hover": {
      color: colors.bgColorHeader,
    },
  },
  iconMenu: (props: { open: boolean }) => ({
    display: "flex",
    marginRight: props.open ? "10px" : "0px",
    minWidth: "35px !important",
    justifyContent: "center",
    alignItems: "center",
    width: "35px !important",
    height: "35px !important",
    color: colors.sidebarColor,
    "& .MuiSvgIcon-root": {
      fontSize: "16px !important",
    },
  }),

  noIcon: {
    minWidth: "45px !important",
  },

  icon: {
    fontSize: "8px !important",
    marginLeft: 13,
  },
  iconToggle: {
    fontSize: "20px !important",
  },
  itemTitleText: {
    fontSize: "13px !important",
  },
  itemText: {
    "& .MuiTypography-root": { fontWeight: 400, textTransform: "capitalize" },
  },
  itemSecondsText: {
    "& .MuiTypography-root": {
      textTransform: "capitalize",
    },
  },
  titleDashboard: {
    marginLeft: "20px !important",
  },
  iconDefault: {
    color: colors.defaultColor,
  },
  wrapperListMenu: {
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: colors.bgColorMenu,
    paddingTop: "20px",
    height: "calc(100vh - 54px)",
    paddingBottom: "40px",
  },
  sideBarHeaderOpen: {
    paddingLeft: "4.8px !important",
    margin: "0 19px 0 19px !important",
    marginBottom: "12px",
    color: "rgba(113,142,177,.6)",
    fontWeight: 700,
  },
  sideBarHeaderClose: {
    paddingLeft: "7.2px !important",
    margin: "0 19px 0 19px !important",
    marginBottom: "12px !important",
    color: "rgba(113,142,177,.6) ",
    fontWeight: 700,
  },
  wrapperHeader: {
    minHeight: "100vh",
    background: colors.bgColorMenu,
    overflow: "hidden",
  },
  listItemActive: {
    overflowX: "hidden",
    padding: "5px 0 5px 0 !important",
    paddingLeft: "0",
    display: "flex",
    color: colors.bgColorHeader,
    cursor: "pointer",
    justifyContent: "flex-start",
  },
  listItemNoActive: {
    overflowX: "hidden",
    padding: "5px 0 5px 0 !important",
    display: "flex",

    color: colors.sidebarColor,
    cursor: "pointer",
    justifyContent: "flex-end",
  },
  menuItemActive: {
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 0 8px 0 !important",
    color: `${colors.white} !important`,
    transition: "all 0.3s ease-in-out",
    background: `${colors.bgColorHeader} !important`,
    "&:hover": {
      backgroundColor: `${colors.bgColorHeader} !important`,
      color: "#fff !important",
    },
  },
  menuItemNoActive: {
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 0 8px 0 !important",
    color: `${colors.sidebarColor} !important`,
    transition: "all 0.3s ease-in-out",
    background: "none !important",
    "&:hover": {
      backgroundColor: `${colors.bgPrimary} !important`,
      color: `${colors.defaultColor} !important`,
    },
  },
  
});
