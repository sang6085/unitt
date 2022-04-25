import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    textfield: {
      "& fieldset": {
        border: "none",
      }
    },
    btnSearch: {
        margin: "0 40px 0 40px",
        height: 40, 
        borderRadius: "8px", 
        textTransform: "none", 
        minWidth: 100
      },
      itemsCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
      },
      searchIcon: {
        fontSize: "26px"
      }
  })