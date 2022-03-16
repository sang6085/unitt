import { Box, styled } from "@mui/system";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, ButtonProps, Menu, MenuItem } from "@mui/material";

interface IPButtonStyle {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  endIcon?: React.ReactNode;
  variant?: "text" | "outlined" | "contained" | undefined;
  onClose?: any;
  list?: any;
  open?: any;
  value?: any;
  anchorEl?: any;
}

const StyleButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // backgroundColor: "blue",
  // color: "white",
  // fontWeight: "bold",
  // textTransform: "none",
}));

export const StyleButtonComponent: React.FC<IPButtonStyle> = ({
  value,
  open,
  list,
  onClick,
  endIcon,
  variant,
  onClose,
  anchorEl,
}) => {
  return (
    <Box>
      <StyleButton
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant={variant || "contained"}
        disableElevation
        onClick={onClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {value}
      </StyleButton>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
      >
        {list?.map((item: any, index: any) => (
          <MenuItem key={index} onClick={onClose} disableRipple>
            {item?.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
