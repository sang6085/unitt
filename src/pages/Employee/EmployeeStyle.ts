import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    wrapperAction: {
        display: "flex", 
        justifyContent: "space-around"
    },
    wrapperJobInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    jobInfo: {
        background: "lightBlue",
        width: 10,
        height: 10,
        borderRadius: 40,
        marginRight: "16px",
    },
    boxSearch: {
        padding: "32px 16px 32px 16px",
        display: "flex", 
        flexDirection: "row"
    },
    btnSearch: {
        marginLeft: "16px", 
        width: "15%"
    }, 
    imgAvatar: {
        height: 52,
        width: 52,
        borderRadius: 40,
    },
    iconAction: {
        color: "red"
    }
  });