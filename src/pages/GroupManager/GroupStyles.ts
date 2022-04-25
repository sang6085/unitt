import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  boxHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  paper:{
    padding: "32px 10%"
  },
  textField:{
    marginTop: 0.5
  },
  boxBtn: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  saveBtn:{
    marginLeft: "16px !important"
  }
});