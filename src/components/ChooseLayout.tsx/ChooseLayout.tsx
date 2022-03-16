import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WebIcon from "@mui/icons-material/Web";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Contexts/ThemeContext";
import { LocalStorageKey } from "../../configs/consts";
import { makeStyles } from "@mui/styles";

interface IPMenuLayout {
  title: string;
  name: string;
}
interface IPLayout {
  listData?: IPMenuLayout[];
}

const useStyles = makeStyles({
  button: {},
  selected: (props: { color: string; theme: string }) => {
    return {
      borderRadius: "10px !important",
      boxShadow:
        props.theme !== "dark"
          ? "rgba(165, 165, 165, 0.8) 0px 2px 4px, rgba(165, 165, 165, 0.3) 0px 1px 8px 0px"
          : "none",
      color: ` ${props.color} !important`,
      background: props.theme === "dark" ? "#ffffff3d !important" : "none",
    };
  },
  boxIcon: (props: { color: string; theme: string }) => {
    return {
      height: "38px",
      width: "38px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: ` ${props.color} !important`,
      boxShadow:
        props.theme !== "dark"
          ? "rgba(165, 165, 165, 0.8) 0px 2px 4px, rgba(165, 165, 165, 0.3) 0px 1px 8px 0px"
          : "none",
    };
  },
  selectedBoxIcon: (props: { color: string }) => {
    return {
      height: "38px",
      width: "38px !important",
      borderRadius: "10px",
      display: "flex",
      color: "white",
      alignItems: "center",
      justifyContent: "center",
      background: ` ${props.color} !important`,
    };
  },
  text: {
    fontSize: "15px !important",
  },
  selectedText: (props: { color: string }) => {
    return {
      color: `${props.color} !important`,
      fontSize: "15px !important",
      fontWeight: "bold",
    };
  },
});

const ChooseLayout: React.FC<IPLayout> = ({ listData }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const useThemeContext = useTheme();
  const classes = useStyles({
    color: useThemeContext.colorTheme,
    theme: useThemeContext.modeTheme,
  });
 
  const handleClick = () => {
    setOpen(!open);
  };
  const getValueMenu = (val: string) => {
    localStorage.setItem(LocalStorageKey.LAYOUT, val);
    useThemeContext.setLayout(
      val === "boxed" || val === "collapsed" || val === "topNav" ? val : "boxed"
    );
  };

  return (
    <Box sx={{ px: 2, width: 290, mb: -1.5 }}>
      <Typography sx={{fontWeight: "bold", fontSize: "12px", mb: 1, mx: 0.5}}> {t(`layout.chooselayout`).toLocaleUpperCase()} </Typography>
      <ListItemButton
        className={open ? classes.selected : classes.button}
        onClick={handleClick}
      >
        <ListItemIcon>
          <Box className={open ? classes.selectedBoxIcon : classes.boxIcon}>
            <WebIcon />
          </Box>
        </ListItemIcon>
        <ListItemText>
          <Box className={open ? classes.selectedText : classes.text}>
            {t(`layout.chooselayout`)}
          </Box>
        </ListItemText>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </ListItemButton>
      <Collapse sx={{ mb: 1, mt:0.5 }} in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listData?.map((item, index) => (
            <ListItemButton
              onClick={() => getValueMenu(item.title)}
              key={index}
              sx={{
                my: 0.3,
                height: "30px",
                pl: 9,
                ":hover": {
                  background: "none",
                  "& .MuiTypography-root": {
                    fontWeight: 500,
                  },
                },
              }}
            >
              <ListItemText key={index}>
                <Typography key={index} sx={{ fontSize: "14px" }}>
                  {t(`layout.${item.title}`)}
                </Typography>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};
export default ChooseLayout;
