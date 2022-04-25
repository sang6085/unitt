import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
export const useStyle = makeStyles((theme: Theme) => ({
  titleBox: {
    margin: 0,
    marginBottom: "8px",
    display: "inline-block",
    paddingBottom: "3px",
  },
  borderAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    width: 140,
    height: 140,
    borderRadius: "50%",
    padding: 8,
    border: "1px dashed",
    paddingTop: "8px",
  },
  buttonUpload: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 125,
    width: 125,
    paddingTop: "15px !important",
    borderRadius: "50% !important",
  },
  boxEmailVerified: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    p: "16px 0",
  },
  icon: {
    fontSize: "18px",
    color: theme.palette.primary.main,
    padding: 0,
    //marginLeft: "5px",
  },
  itemCenter: {
    display: "flex",
    justifyContent: "center",
  },
  itemEnd: {
    display: "flex",
    justifyContent: "end",
  },
  itemBtnRight: {
    display: "flex",
    justifyContent: "end",
  },
  borderBtn: {
    border: "1px solid #1976d2",
  },
  fontWeight500: {
    fontWeight: 500,
  },
  spacingBtn: {
    marginLeft: "10px !important",
  },
  boxImg: {
    height: "100%",
    width: "100%",
  },
  img: {
    height: 125,
    width: 125,
    borderRadius: "50%",
  },
  noneImg: {
    height: 0,
    width: 0,
  },
  contentForm: {
    paddingTop: "20px",
  },
  hvBtnUpload: {
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    position: "absolute",
    top: 0,
    opacity: 0,
    "&:hover": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      opacity: 1,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(43,39, 47, 0.44)",
    },
  },
  paper: {
    padding: "32px 10%",
  },
}));
