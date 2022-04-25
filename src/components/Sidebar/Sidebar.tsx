import {
  Box,
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem as MenuItemMui,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import logo40 from "assets/logo/unitsmall.png";
import logo from "assets/logo/unitwhite.png";
import { hasChildren } from "utils/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { colors } from "configs/consts";
import { loadCSS } from "fg-loadcss";
import { useStyles } from "components/Sidebar/SidebarStyle";
import Footer from "components/Footer/Footer";
interface IBoxedSidebar {
  headerHeight: number;
  drawerWidth?: number;
  listMenu: any;
  pageName?: string;
  open: boolean;
}

const MenuItem = ({ item, open }: any) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;

  return (
    <Box>
      <Component item={item} open={open} />
    </Box>
  );
};

const SingleLevel = ({ item, open }: any) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const getPathName = location.pathname.slice(1).split("/")[0];

  const isActive = () => {
    if (item.path === location.pathname || item.path === `/${getPathName}`) {
      return true;
    }
    return false;
  };

  const navigateOn = (url: string) => {
    navigate(url);
  };

  return (
    <Box pr={0}>
      <MenuItemMui
        className={isActive()? classes.menuItemActive: classes.menuItemNoActive}
        onClick={() => navigateOn(item.path)}
        dense={true}
      >
        {open || item.type === "first" ? (
          <ListItemIcon
            className={
              item.type === "first" ? classes.iconMenu : classes.noIcon
            }
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
          sx={{ textAlign: open ? "left" : "center" }}
          primary={open ? item.title : item.title.charAt(0)}
        />
      </MenuItemMui>
    </Box>
  );
};

const MultiLevel = ({ item, open }: any) => {
  const classes = useStyles({ open });
  const { items: children } = item;
  const [openDrop, setOpenDrop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    item.items.forEach((item: any) => {
      if (item.path === location.pathname) {
        setOpenDrop(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setOpenDrop((prev) => !prev);
  };

  const isActive = (arr: any) => {
    let result = false;
    const getPathName = location.pathname.slice(1).split("/")[0];

    arr.forEach((item: any) => {
      if (item.path === location.pathname || item.path === `/${getPathName}`) {
        result = true;
      }
    });
    return result;
  };

  const handleExpand = () => {
    if (open && openDrop) {
      return <ExpandLess className={classes.iconToggle} />;
    } else if (open && openDrop === false) {
      return <ExpandMore className={classes.iconToggle} />;
    }
  };

  const handleSecondsMenu = (item: any) => {
    if (item.type !== "seconds") {
      if (item.icon === "") {
        return <AcUnitIcon className={classes.iconDefault} />;
      } else {
        return (
          <Box className="icon" sx={{ pt: "4px" }}>
            <Icon
              baseClassName="far"
              className={item.icon}
              sx={{
                fontSize: 20,
                color: isActive(item.items)
                  ? colors.bgColorHeader
                  : colors.sidebarColor,
              }}
            />
          </Box>
        );
      }
    }
  };

  return (
    <Box>
      <ListItem
        className={
          isActive(item.items)
            ? classes.listItemActive
            : classes.listItemNoActive
        }
        onClick={handleClick}
      >
        {open || item.type === "first" ? (
          <ListItemIcon
            className={
              item.type === "first" ? classes.iconMenu : classes.noIcon
            }
          >
            {handleSecondsMenu(item)}
          </ListItemIcon>
        ) : null}

        <ListItemText
          className={
            item.type !== "first" ? classes.itemSecondsText : classes.itemText
          }
          primary={open ? item.title : ""}
        />
        {handleExpand()}
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
  const open = props.open;

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css"
    );
    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Fragment>
      <Box className={classes.wrapperHeader}>
        {/* Header Sidebar */}
        <Box className={open ? classes.logoOpen : classes.logoClose}>
          {open ? (
            <Link to="/">
              <img src={logo} alt="logo" width={120} />
            </Link>
          ) : (
            <img src={logo40} alt="logo" width={40} />
          )}
        </Box>
        {/* End Header Sidebar */}
        <Box className={classes.wrapperListMenu}>
          {props.listMenu.map((item: any, key: any) => (
            <Box key={key}>
              {item.name ? (
                <Typography
                  variant={"caption"}
                  className={
                    open
                      ? classes.sideBarHeaderOpen
                      : classes.sideBarHeaderClose
                  }
                >
                  {props.open ? item.name : "..."}
                </Typography>
              ) : (
                ""
              )}
              <Box px={open ? 2 : 1.5}>
                <MenuItem key={key} item={item} open={open} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Footer open={open} />
    </Fragment>
  );
};

export default Sidebar;


