import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

const txt_gray = "#8898aa";
const blue = "#0a48b3";

export const useStyles = makeStyles({
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: colors.bgPrimary
    },
    btnLogin: {
        transition: "transform .3s !important",
        color: "#fff !important",
        padding: "8px 50px!important",
    },
    layout: {
        display: "flex",
        flexDirection: "column",
        width: "85%",
        maxWidth: 445,
        margin: "0 auto",
        maxHeight: 580,
        minHeight: 450,
        boxShadow: "0 0 1rem 0 rgb(177 184 191 / 15%) !important",
        background: "#fff  !important",
    },

    otherLogin: {
        width: 130,
        height: 45,
        borderRadius: 5,
        margin: "0 5px",
        background: "#fff",
    },

    OtherLoginLink: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
        border: "1px solid #fff",
        borderRadius: "5px",
        fontWeight: 600,
        color: blue,
        fontSize: 14,
    },

    textfield: {
        background: "#fff",
        fontSize: 14,

        "& fieldset": {
            border: "none",
            boxShadow: "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
        },
        "& input": {
            fontSize: 13,
            color: txt_gray,
        },
    },

    checkbox: {
        color: txt_gray,
        "& span": {
            color: txt_gray,
            fontSize: 14,
        },
    },

    transformLink: {
        fontSize: 13,
        color: txt_gray,
        display: "flex", 
        flexGrow: 1, 
        justifyContent: "end",
        "&:hover": {
            color: "gray",
        },
    },
    boxImg:{
        marginTop: "16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    boxContent:{
        paddingLeft: '32px',
        paddingRight: '32px',
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    wrapperImg:{
        paddingLeft: "32px",
        paddingRight: "32px",
        paddingBottom: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }, 
    logoImg: {
        marginRight: "12px"
    }, 
    wrapperTitleHeader: {
        display: "flex", 
        justifyContent: "center", 
        marginBottom: "16px !important"
    },
    titleHeader: {
        color: "#8898aa", 
        fontSize: "15px"
    },
    errValidation:{
        color: "red", 
        fontSize: "13px" 
    },
    itemsCenter: {
        display: "flex", 
        alignItems: "center"
    },
    pb: {
        paddingBottom: " 20px"
    },
    wrapperFooter: {
        display: "flex",
    },
    titleFooter: {
        display: "flex", 
        flexGrow: 1 
    }
});
