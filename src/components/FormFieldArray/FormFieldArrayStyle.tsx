import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  p0: {
    padding: `0px !important`,
  },

  pt3: {
    paddingTop: `${theme.spacing(3)} !important `,
  },

  mx2: {
    margin: `0px ${theme.spacing(2)} !important`,
  },

  ml1: {
    marginLeft: `${theme.spacing(1)} !important`
  },

  mt1: {
    marginTop: `${theme.spacing(1)} !important`
  },

  w90: {
    width: "90%",
  },

  fullWidth: {
    width: "100%",
  },

  w50: {
    width: "50%",
  },

  colorBlue: {
    color: "blue",
  },

  colorRed: {
    color: "red",
  },

  accordion: {
    boxShadow: "none !important",
    py: 1,
    "&:before": {
      height: "0px !important",
    },
  },
}));
