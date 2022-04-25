import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { colors } from "configs/consts";
import PageTitle from "../PageTitle/PageTitle";

const OutletComponent = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, py: 3, mt: "30px", backgroundColor: colors.bgPrimary }}
    >
      <PageTitle />
      <Box className="content">
        <Outlet />
      </Box>
    </Box>
  );
};

export default OutletComponent;
