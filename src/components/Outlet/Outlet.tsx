import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import PageTitle from "../PageTitle/PageTitle";

const OutletComponent = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, mt: 5, backgroundColor: "#f0f6ff" }}
    >
      <PageTitle />
      <Box className="content">
        <Outlet />
      </Box>
    </Box>
  );
};

export default OutletComponent;
