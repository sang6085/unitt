import {
  Box,
  Collapse,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import logo40 from "../../assets/logo/unitsmall.png";
import logo from "../../assets/logo/unitwhite.png";
import AdjustIcon from "@mui/icons-material/Adjust";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { hasChildren } from "../../utils/utils";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { colors } from "../../utils/colors";
import { loadCSS } from "fg-loadcss";
import { CommonStyles } from "../../utils/styles";

interface IBoxedSidebar {
  headerHeight: number;
  drawerWidth?: number;
  listMenu: any;
  pageName?: string;
  open: boolean;
  handleDrawerOpen: any;
  handleDrawerClose: any;
  handleMenu?: any;
}
const useStyles: any = makeStyles({
  itemButton: {
    // background: "blue !important"
    marginBottom: "10px !important",
  },
  boxMenu: {
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: colors.bgColorMenu,
  },
  boxMenuClose: {
    overflowY: "hidden",
    background: colors.bgColorMenu,
  },
  dashboard: {
    //fontWeight: 500,
    fontSize: "14px !important",
  },
  logoOpen: {
    display: "flex",
    alignItems: "center",
    height: "4.0625rem",
    backgroundColor: colors.bgColorHeader,
    boxShadow: "0 1px 1px 1px rgb(18 106 211 / 8%)",
    paddingLeft: "15px",
  },
  logoClose: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "4.0625rem",
    backgroundColor: colors.bgColorHeader,
    boxShadow: "0 1px 1px 1px rgb(18 106 211 / 8%)",
    paddingLeft: "10px",
  },
  nameDB: {
    //fontWeight: "bold",
    fontSize: "13px",
  },
  linkMenu: {
    color: colors.sidebarColor,
    //fontWeight: 500,
    display: "block",
    "&:hover": {
      color: colors.bgColorHeader,
    },
  },
  linkMenuActive: {
    color: `${colors.bgColorHeader} !important`,
    //fontWeight: 500,
    "&:hover": {
      color: colors.bgColorHeader,
    },
  },
  iconMenu: {
    display: "flex",
    marginRight: "10px",
    minWidth: "35px !important",
    justifyContent: "center",
    alignItems: "center",
    width: "35px !important",
    height: "35px !important",
    color: colors.sidebarColor,
    "& .MuiSvgIcon-root": {
      fontSize: "16px !important",
    },
  },

  icon: {
    fontSize: "8px !important",
    marginLeft: 13,
  },
  iconToggle: {
    fontSize: "20px !important",
  },
  itemTitleText: {
    fontSize: "13px !important",
  },
  itemText: {
    "& .css-qd1o9i-MuiTypography-root": { fontWeight: 300, textTransform: 'capitalize' },
  },
  itemSecondsText: {
    "& .MuiTypography-root": {
      marginLeft: "-10px !important",
      textTransform: 'capitalize'
    },
    // "& .css-qd1o9i-MuiTypography-root": {
    //   fontWeight: 300,
    // },
  },
  titleDashboard: {
    marginLeft: "20px !important",
  },
  iconDefault: {
    color: colors.defaultColor,
  },

  collapseMenu: {
    borderLeft: `3px solid ${colors.bgColorHeader}`,
    "& .css-1uuza9g-MuiListItem-root": {
      color: `${colors.bgColorHeader} !important`,
    },

    "& .MuiSvgIcon-root": {
      color: colors.bgColorHeader,
    },
    "& .icon": {
      color: colors.bgColorHeader,
    },
  },
  collapseMenuNone: {
    paddingLeft: "3px",
  },
});

const MenuItem = ({ item, open }: any) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;

  return (
    <Box sx={{ overflowY: "scroll", overflowX: "hidden" }}>
      <Component item={item} open={open} />
    </Box>
  );
};

const SingleLevel = ({ item, open }: any) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Link
      to={item.type !== "first" ? item.path : ""}
      className={
        item.path === location.pathname
          ? classes.linkMenuActive
          : classes.linkMenu
      }
    >
      <ListItem
        sx={{
          overflowX: "hidden",
          display: "flex",
          justifyContent: "left",
          px: open ? 1 : 3.7,
        }}
        className={classes.listItem}
      >
        {open || item.type === "first" ? (
          <ListItemIcon
            className={item.type === "first" ? classes.iconMenu : ""}
          >
            {item.type === "seconds" ? (
              <></>
            ) : item.icon === "" ? (
              <AcUnitIcon className={classes.iconDefault} />
            ) : (
              item.icon
            )}
          </ListItemIcon>
        ) : null}
        <ListItemText
          className={
            item.type !== "first" ? classes.itemSecondsText : classes.itemText
          }
          primary={open ? item.title : item.title.charAt(0)}
        />
      </ListItem>
    </Link>
  );
};

const MultiLevel = ({ item, open }: any) => {
  const classes = useStyles();
  const { items: children } = item;
  const [openDrop, setOpenDrop] = useState(false);
  const location = useLocation();
  useEffect(() => {
    item.items.forEach((item: any) => {
      if (item.path === location.pathname) {
        setOpenDrop(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = () => {
    setOpenDrop((prev) => !prev);
  };
  const isActive = (arr: any) => {
    let result = false;

    arr.forEach((item: any) => {
      if (item.path === location.pathname) {
        result = true;
      }
    });
    return result;
  };
  return (
    <Box
      className={
        isActive(item.items) && openDrop
          ? classes.collapseMenu
          : classes.collapseMenuNone
      }
    >
      <ListItem
        sx={{
          overflowX: "hidden",
          px: open ? 1 : 4,
          color: colors.sidebarColor,
          cursor: "pointer",
          paddingLeft: "8px",
        }}
        onClick={handleClick}
      >
        {open || item.type === "first" ? (
          <ListItemIcon className={item.type === "first" && classes.iconMenu}>
            {item.type === "seconds" ? (
              // <Brightness1Icon className={classes.icon} />
              <></>
            ) : item.icon === "" ? (
              <AcUnitIcon className={classes.iconDefault} />
            ) : (
              <Box className="icon" sx={{ pt: "4px" }}>
                <Icon
                  baseClassName="far"
                  className={item.icon}
                  style={{ fontSize: 20 }}
                />
              </Box>
            )}
          </ListItemIcon>
        ) : null}

        <ListItemText
          className={
            item.type !== "first" ? classes.itemSecondsText : classes.itemText
          }
          primary={open ? item.title : ""}
        />
        {open && openDrop ? (
          <ExpandLess className={classes.iconToggle} />
        ) : open && openDrop === false ? (
          <ExpandMore className={classes.iconToggle} />
        ) : (
          <></>
        )}
      </ListItem>
      <Collapse in={openDrop} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child: any, key: number) => (
            <MenuItem key={key} item={child} open={open} />
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

const Sidebar = (props: IBoxedSidebar) => {
  const classes = useStyles();
  const styles = CommonStyles();
  const open = props.open;

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css"
    );
    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: colors.bgColorMenu,
        overflow: "hidden",
      }}
    >
      <Box className={open ? classes.logoOpen : classes.logoClose}>
        {open ? (
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: 120 }}
            />{" "}
          </Link>
        ) : (
          <img src={logo40} alt="logo" style={{ width: 40 }} />
        )}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            ml: 2,
            justifyContent: "end",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {props.handleMenu === "close" ? (
            props.open && (
              <IconButton onClick={() => props.handleDrawerOpen()}>
                <CircleOutlinedIcon className={styles.icons} />
              </IconButton>
            )
          ) : (
            <IconButton onClick={() => props.handleDrawerClose()}>
              <AdjustIcon className={styles.icons} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          background: colors.bgColorMenu,
          paddingTop: "20px",
          height: "calc(100vh - 4.0625rem)",
          // pb: "63px",
        }}
      >
        {props.listMenu.map((item: any, key: any) => (
          <Box key={key}>
            {item.name ? (
              <Typography
                variant={"caption"}
                sx={{
                  pl: 0.6,
                  mx: 2,
                  mb: 1.5,
                  color: "rgba(113,142,177,.6)",
                }}
              >
                {props.open ? item.name : "..."}
              </Typography>
            ) : (
              ""
            )}
            <MenuItem key={key} item={item} open={open} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
