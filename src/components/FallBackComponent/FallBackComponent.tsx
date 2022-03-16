import { Paper, Typography } from "@mui/material";
import React from "react";

const FallBackComponent = () => {
  return (
    <Paper sx={{ p:3, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography sx={{ fontWeight: 600, fontSize: 14 }}> Wait, something seems to be wrong!</Typography>
    </Paper>
  );
};

export default FallBackComponent;
