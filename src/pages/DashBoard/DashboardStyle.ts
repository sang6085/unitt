import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    containerDB: {
      width: "100%",
      height: `calc(100vh - 100px)`,
      overFlowY: "auto",
      padding: "0 24px 8px 24px",
      marginBottom: "8px",
    },
    paper: {
      borderRadius: "15px !important",
      paddingTop: "25px",
      paddingBottom: "25px",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    boxTextSaleOverview: {
      display: "flex",
      alignItems: "center",
      marginTop: "5px",
    },
    boxIconActive: {
      paddingRight: 10,
      marginTop: 20,
    },
    fourInfo: {
      display: "flex",
      alignItems: "center",
    },
    iconActive: {
      marginRight: "10px !important",
      padding: 10,
      color: "white",
      width: "22px",
      height: "22px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    typoFourInfo: {
      fontSize: "12px !important",
    },
    imgBg: {
      display: "flex",
      justifyContent: "center",
      "& img": {
        width: "90%",
      },
    },
    elevation: {
      height: "100%",
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
    boxChartLine:{
        height: "auto",
        marginTop: "40px"
    },
    boxChartDonut:{
        height: "100%",
        marginTop: "40px",
        justifyContent: "center",
        display: "flex",
    },
    boxCard:{
        display: "flex", 
        justifyContent: "flex-end"
    },
    titleChar: {
      fontWeight: "700 !important"
    },
    colorTitleChar: {
      color: "rgb(99, 115, 129)"
    }, 
    dropdownYear: {
      color: "rgb(33, 43, 54) !important",
      backgroundColor: "rgb(244, 246, 248) !important",
    }
  });