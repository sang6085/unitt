import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

export const useStyles = makeStyles({
    container: {
        position: "absolute",
        zIndex: 9999,
        bottom: 0,
        padding: "0 10px",
        height: 40,
        background: colors.white
    }
})