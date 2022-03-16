import { IconButton } from "@mui/material";
import React from "react";

const IconButtonComponent: React.FC<any> = ({ onClick, children }) => {
  return <IconButton onClick={onClick}>{children}</IconButton>;
};

export default IconButtonComponent;
