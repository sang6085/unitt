import {
  Box,
  Menu,
} from "@mui/material";
import React from "react";
import { HexColorPicker } from "react-colorful";

interface IAccountMenu {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  color: string;
  setColor: any;
}

const ColorPickerMenu = (props: IAccountMenu) => {
  const { open, anchorEl, handleClose, color, setColor } = props;
  
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      //   onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
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
      <Box>
        <HexColorPicker color={color} onChange={setColor} />
      </Box>
    </Menu>
  );
};

export default ColorPickerMenu;
