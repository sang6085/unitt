import {
  Button,
  Dialog,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../contexts/ThemeContext";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

interface IPSearch {
  open: boolean;
  onClose: any;
}

const useStyles = makeStyles({
  textfield: {
    "& fieldset": {
      border: "none",
    },
  },
})

const Transition = React.forwardRef(function Transition(
  props: any & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props}/>;
});

const Search: React.FC<IPSearch> = ({ open, onClose }) => {
  const classes = useStyles()
  const {t} = useTranslation()
  const useThemeContext = useTheme();
  const drawerWidth =
    useThemeContext.layout === "collapsed"
      ? 120
      : useThemeContext.layout === "boxed"
      ? 300
      : 0;
  const DialogCustom = styled(Dialog)(({ theme }) => ({
    "& .MuiBackdrop-root": {
      marginLeft: `${drawerWidth}px`,
      background: "rgba(0, 7, 52, 0)",
      height: 100,
      padding: 0,
    },
    "& .MuiPaper-root": {
      position: 'absolute',
    top: 0,
      backdropFilter: "blur(5px)",
      background: "rgba(0, 7, 52, 0)",
      marginLeft: `${drawerWidth}px`,
      maxWidth: `calc(100% - ${drawerWidth}px) !important`,
      height: 100,
      boxShadow:"none"
    },
    "& .css-irjuq2-MuiPaper-root-MuiDialog-paper":{
      marginRight: 0
    }
  }));
  

  return (
    <DialogCustom
      fullWidth
      fullScreen
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
        }}
      >
        <TextField
          className={classes.textfield}
          fullWidth
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 26 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ mx: 5, height: 40, borderRadius: "8px", textTransform: "none", minWidth: 100}}
        >
          {t(`button.search`)}
        </Button>
      </Box>
    </DialogCustom>
  );
};

export default Search;
