import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

export const useStyles = makeStyles({
  paper: {
    padding: "32px 10%"
  },
  table: {
    width: "100%",
    borderRadius: 10
  },
  typo: {
    color: colors.primaryColor
  },
  btnAction: {
    margin: "0px 8px !important"
  }
})