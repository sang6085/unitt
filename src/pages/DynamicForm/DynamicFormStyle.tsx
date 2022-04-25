import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: "100%",
  },
  
  p2: {
    padding: theme.spacing(2),
  },

  mx2: {
    margin: `0px ${theme.spacing(2)} !important`,
  }
}));
