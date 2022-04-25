import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

export const useStyles = makeStyles({
  boxSearch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boxActionHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  iconAction: {
    cursor: "pointer",
    color: "white",
    fontSize: "30px !important",
  },
  iconBtn: {
    marginRight: "8px !important",
    marginLeft: "8px !important"
  },
  avatar: {
    fontSize: "40px !important",
    color: colors?.primaryColor,
  },
  iconMenu: {
    color: colors?.primaryColor,
  },
  headerBox: {
    height: "54px",
    width: "100%",
    boxShadow: "0 1px 1px 1px rgb(18 106 211 / 8%)",
    background: colors?.bgColorHeader,
  },
});
