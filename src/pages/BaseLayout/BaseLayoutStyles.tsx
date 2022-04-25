import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  drawer: {
    "& .MuiPaper-root": {
      border: "none !important",
      position: "initial",
    },

    "& .MuiPaper-elevation": {
      border: "none !important",
    },

    position: "fixed",
    zIndex: "1000 !important",
  },
  transitionAppBarOpen: {
    transition: "all 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms !important",
    background: "none",
    zIndex: "999 !important",
  },
  transitionAppBarClose: {
    transition: "all 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms !important",
    background: "none",
    zIndex: "999 !important",
  },
  transitionWrapperMain: {
    transition: "margin 0.3s !important",
  },
  sidebarWidthOpen: {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: 250,
    },
  },
  mobileClose: {
    display: "none",
    "& .MuiPaper-root": {
      border: "none !important",
      position: "initial",
    },

    "& .MuiPaper-elevation": {
      border: "none !important",
    },

    position: "fixed",
    zIndex: "1000 !important",
  },
  mobileOpen: {
    display: "block",
    "& .MuiPaper-root": {
      border: "none !important",
      position: "initial",
    },

    "& .MuiPaper-elevation": {
      border: "none !important",
    },

    position: "fixed",
    zIndex: "1000 !important",
  },
});
