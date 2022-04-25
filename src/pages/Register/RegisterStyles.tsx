import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    paperContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "517px",
      minWidth: "540px",
      background: "blue",
      padding: 20,
    },
    boxTitle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    layout: {
      display: "flex",
      flexDirection: "column",
    },
    boxInput: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "center",
      minHeight: 430,
      paddingTop: 50,
      width: "90%",
    },
    boxChildInput: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "26px !important",
    },
    input: {
      // marginBottom: "26px !important",
      backgroundColor: "white !important",
  
      "& :focus": {
        color: "#79838e",
      },
  
      "& fieldset": {
        fontSize: 14,
        border: "none",
        innerHeight: "46px",
        boxShadow: "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
      },
      "& input": {
        fontSize: 13,
        color: "#8898aa",
        paddingLeft: 10,
      },
      "& .css-ittuaa-MuiInputAdornment-root": {
        // color: "#adb5bd",
        color: "#79838e",
      },
      "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: "#79838e",
      },
    },
    boxSecurePw: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 1,
    },
  
    boxCheckbox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 24,
      marginLeft: -6,
    },
    boxBtn: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 30,
    },
    btnRegister: {
      width: "30%",
      textTransform: "none",
      fontWeight: "bold",
      height: "45px",
    },
    privacyPolicy: {
      cursor: "pointer", 
      color: "blue", 
      fontSize: 14
    },
    agree: {
      paddingRight: "8px !important", 
      fontSize: 14, 
      color: "#8898aa"
    },
    passwordStrength: {
      fontSize: 13,
      paddingRight: "8px",
      fontStyle: "italic",
      color: "#8898aa",
    }, 
    errorsMessage: {
      color: "red", 
      fontSize: "11px !important"
    },
    colorErrPassword: {
      color :"red !important",
      fontSize: 13,
      fontWeight: "bold",
      fontStyle: "italic",
    },
    colorPassword: {
      color :"#2dce89!important",
      fontSize: 13,
      fontWeight: "bold",
      fontStyle: "italic",
    }
    
  });