import { makeStyles } from "@mui/styles";

const txt_gray = "#8898aa";
const blue = "#0a48b3";

export const useStyles = makeStyles({
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f0f6ff"
    },
    btnLogin: {
        transition: "transform .3s !important",
        color: "#fff !important",
        padding: "8px 50px!important",
        borderRadius: '40px !important',
        backgroundImage: `linear-gradient(${310}deg, rgb(${33}, ${82}, ${255}), rgb(${33}, ${212}, ${253})) !important`,
        "&:hover": {
            transform: `scale(${1.05})`,
        },
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

        "&:hover": {
            color: "#000",
            marginTop: -1,
            boxShadow: "-3px 7px 10px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
        },

        "&:active": {
            background: "#9e9e9e30",
        },
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
});
