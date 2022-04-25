import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    boxNumber: {
      display: "flex",
      alignItems: "flex-end",
      marginTop: "16px",
      marginBottom: "8px",
    },
    smallNumberOne: {
      marginLeft: "10px !important",
      marginBottom: "2px !important",
      fontWeight: "500 !important"
    },
    smallNumberTwo: {
      marginLeft: "10px !important",
      marginBottom: "2px !important",
      fontWeight: "500 !important"
    },
    boxChart: {
      width: "60px",
      height: "36px",
    },
    elevation: {
      backgroundColor: "rgb(255, 255, 255)",
      color: "rgb(33, 43, 54)",
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      backgroundImage: "none",
      overFlow: "hidden",
      position: "relative",
      boxShadow:
        "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
      zIndex: 0,
      alignItems: "center",
      padding: "24px",
    },
    trendingUp: {
      width: "24px",
      height: "24px",
      display: "flex",
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
      color: "rgb(84, 214, 44)",
      backgroundColor: "rgba(84, 214, 44, 0.16)",
    },
    trendingDown: {
      width: "24px",
      height: "24px",
      display: "flex",
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
      color: "rgb(255, 72, 66)",
      backgroundColor: "rgba(255, 72, 66, 0.16)",
    },
    itemsCenter: {
      alignItems: "center",
      display: "flex"
    },
    countUp: {
      fontWeight: "bold !important",
      marginTop: "12px !important"
    },
    trendingUpIcon: {
      fontSize: "16px !important"
    },
    fw: {
      fontWeight: "500 !important"
    },
  });