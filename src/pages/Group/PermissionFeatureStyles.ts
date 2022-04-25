import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

export const useStyles = makeStyles({
  content:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  tableGroup: {
    width: "33%"
  },
  tableMenu:{
    width: "63%"
  },
  table: {
    "& .tss-1h5wt30-MUIDataTableSearch-searchIcon": {
      display: "none",
    },
  },
  controlIcon:{
    color: colors.defaultColor,
    cursor: "pointer",
    fontSize: "18px",
  }

});
