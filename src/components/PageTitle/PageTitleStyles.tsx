import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

export const useStyles = makeStyles((theme: Theme) => ({
  boxArea: {
    padding: "0 20px",
    width: "100%",
    height: 54,
    position: "fixed",
    background: colors.bgPrimary,
    zIndex: 200,
  },

  currentPage: {
    paddingRight: theme.spacing(2),
    borderRight: "1px solid #CBD9EB",
    textTransform: "capitalize",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  titleHeader: {
    padding: "0 3px 0 3px",
    marginTop: "5px !important",
    fontWeight: 400,
    color: "#839bb3",
  },

  button: {
    marginLeft: `${theme.spacing(2)} !important`,
    marginTop: "2px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px !important",
    },
  },

  iconColor: {
    color: "#839bb3",
  },
}));
