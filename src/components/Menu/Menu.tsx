import { Menu } from "@mui/material";
import { ReactNode } from "react";

interface IMenu {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  children: ReactNode;
  hiddenPadding?: boolean;
}

const MenuComponent = (props: IMenu) => {
  const { anchorEl, handleClose, hiddenPadding } = props;

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{ m: 0 }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiList-padding": {
            py: hiddenPadding ? 0 : 1
          },
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {props.children}
    </Menu>
  );
};

export default MenuComponent;
