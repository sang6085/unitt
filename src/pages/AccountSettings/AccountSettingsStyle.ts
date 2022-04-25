import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  paperSpace: {
    height: "100%",
    padding: 24,
    display: "Flex",
    flexDirection: "column",
  },

  inputTitle: {
    marginBottom: "6px !important",
    marginLeft: "4px !important",
  },

  buttonSpace: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  labelWidth: {
    width: "100%",
  },
  mt: {
    marginTop: "1px"
  }
});
