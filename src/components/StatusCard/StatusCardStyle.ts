import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme: Theme) => ({
    activeText: {
      color: `${theme.palette.success.main} !important`,
      fontSize: "0.75rem !important",
    },
    inActiveText: {
      color: `${theme.palette.error.main} !important`,
      fontSize: "0.75rem !important",
    },
  }));