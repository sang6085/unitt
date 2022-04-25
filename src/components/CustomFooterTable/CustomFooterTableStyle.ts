import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    itemsCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    rowsPerPage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "8px 16px 8px 0"
    },
    wrapperFooter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: "8px",
        marginBottom: "8px",
        paddingLeft: "16px",
        paddingRight: "16px"
    }, 
    mr: {
        marginRight: "16px"
    }
  });