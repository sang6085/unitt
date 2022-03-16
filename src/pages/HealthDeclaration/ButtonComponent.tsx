import { Box, Button } from "@mui/material";
import React from "react";

const ButtonComponent: React.FC<any> = ({ onClick, label, name, type, startIcon }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
      <Button className={name} variant="contained" color="primary" onClick={onClick} type={type} startIcon={startIcon}>
        {label}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
