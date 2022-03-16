import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import WebIcon from "@mui/icons-material/Web";
import React from "react";
import { useTranslation } from "react-i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "../../Contexts/ThemeContext";
import { makeStyles } from "@mui/styles";
import { LocalStorageKey } from "../../configs/consts";

interface IPMenuLayout {
  title: string;
  name: string;
}
interface IPLayout {
  listData?: IPMenuLayout[];
}

const useStyles = makeStyles((theme: Theme) => ({
  backDrop: {
    backdropFilter: "blur(1px)",
    backgroundColor: "rgba(255,255,255,0.1) !important",
  },
  selected: {
    padding: 12,
    borderRadius: 5,
  },
  buttonIcon: {
    borderRadius: "0% !important",
  },
}));

const ChooseLayoutCollapse: React.FC<IPLayout> = ({ listData }) => {
  const { t } = useTranslation();
  const useThemeContext = useTheme();
  const mode: string = useThemeContext.modeTheme;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const MyListItemButton = styled(ListItemButton)({
    borderRadius: "3px",
    color: mode === "dark" ? "white" : "#474747",
    ":hover": {
      background: mode ? useThemeContext.colorTheme : "#dbd7d4",
      borderRadius: "3px",
      color: mode === "dark" ? "white" : "black",
      fontWeight: "bolder",
    },
  });

  const getValueMenu = (val: string) => {
    localStorage.setItem(LocalStorageKey.LAYOUT, val);
    useThemeContext.setLayout(val === "boxed" || val === "collapsed" || val === "topNav" ? val : "boxed");
  };
  return (
    <Box sx={{ px: 2, width: 100, ml: "12px", mb: -1.2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip
          title={`Choose layout`}
          placement="right"
          arrow
          onClick={(ev: any) => handleClick(ev)}
          className={classes.selected}
        >
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <IconButton className={classes.buttonIcon}>
              <WebIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <ChevronRightIcon sx={{ fontSize: 20 }} />
          </Box>
        </Tooltip>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 2,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "center" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <List component="div" disablePadding sx={{ px: 1, py: 4 }}>
          {listData?.map((item, index) => (
            <Tooltip key={index} placement="right" title={t(`layout.${item.title}`) as string} arrow>
              <MyListItemButton onClick={() => getValueMenu(item.title)} key={index} sx={{ height: "35px" }}>
                <ListItemText key={index}>
                  <Typography key={index} sx={{ fontSize: "15px", fontWeight: 600 }}>
                    {t(`layout.${item.title}`)}
                  </Typography>
                </ListItemText>
              </MyListItemButton>
            </Tooltip>
          ))}
        </List>
      </Menu>
    </Box>
  );
};
export default ChooseLayoutCollapse;
