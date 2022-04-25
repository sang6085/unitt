import {
  Button,
  Dialog,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Ref, ReactElement, forwardRef, FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useStyles } from "components/Search/SearchStyle";

interface IPSearch {
  open: boolean;
  onClose: any;
}



const Transition = forwardRef(function Transition(
  props: any & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props}/>;
});

const Search: FC<IPSearch> = ({ open, onClose }) => {
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
        className={classes.itemsCenter}
      >
        <TextField
          className={classes.textfield}
          fullWidth
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          className={classes.btnSearch}
        >
          {t(`button.search`)}
        </Button>
      </Box>
    </DialogCustom>
  );
};

export default Search;
