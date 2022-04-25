import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  boxHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  boxBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  boxDescription:{
    height: "73%",
    marginBottom: 8
  },
  description: {
    height: '100%',
    "& div": {
      height: "73%",
      display: "flex",
      alignItems: "flex-start",
    },
  },
  paper:{
    padding: "32px 10%"
  },
  textField:{
    marginTop: 0.5
  },
  saveBtn:{
    marginLeft: "16px !important"
  },
  titleCronjob: {
    fontWeight: "bold !important"
  },
  wrapperTitleKey: {
    paddingTop: "0 !important"
  }
});
