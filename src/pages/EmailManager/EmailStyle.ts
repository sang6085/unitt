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
  content:{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
  subject:{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
  },
  sendDate:{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
  },
  dividerDetail:{
    marginTop: "8px !important", 
    marginBottom: 0
  }
});
