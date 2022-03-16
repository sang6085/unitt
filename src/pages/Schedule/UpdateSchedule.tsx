import { Alert, Box, Grid, Snackbar, Typography, Drawer } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { getScheduleById, updateScheduleById } from "../../services/ScheduleService";
import FallBackComponent from "../../components/FallBackComponent/FallBackComponent";
import { errorHandle } from "../../utils/errorHandler";
import FormWidget from "../../components/FormGeneration/FormWidget";

interface IUpdateSchedule {
  id: number;
  toggleDrawer: () => void;
}

const UpdateSchedule = (props: IUpdateSchedule) => {
  const { id, toggleDrawer } = props;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const vertical = "top";
  const horizontal = "right";
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    setLoading(true);
    getScheduleById(id).then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [id]);

  const schema = {
    type: "object",
    required: ["name", "cycle"],
    properties: {
      name: {
        type: "string",
        title: "Tên",
        default: id >= 0 ? data?.name : "",
      },
      description: {
        type: "string",
        title: "Mô Tả",
        default: id >= 0 ? data?.description : "",
      },
      cycle: {
        type: "string",
        title: "Mô tả chu kỳ",
        default: id >= 0 ? data?.cycle : "",
      },
    },
  };

  const uiSchema = {};

  const onSubmit = (data: any) => {
    updateScheduleById({
      id: id,
      name: data.formData.name,
      description: data.formData.description,
      cycle: data.formData.cycle,
    }).then((response: any) => {
      if (response?.success) {
        setOpenAlert(true);
      }
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Drawer anchor={"right"} open={id >= 0 ? true : false} onClose={toggleDrawer}>
      <Box sx={{ width: 320, p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography component="h4" sx={{ fontSize: 15, fontWeight: 500 }}>
            Update Schedule Settings
          </Typography>
          <Box data-name="closeTheme">
            <CloseOutlinedIcon fontSize="small" sx={{ cursor: "pointer" }} onClick={toggleDrawer} />
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              {!loading ? (
                <ErrorBoundary FallbackComponent={FallBackComponent} onError={errorHandle}>
                  <FormWidget schema={schema} onSubmit={onSubmit} uiSchema={uiSchema} titleBtn={"Update"} />
                </ErrorBoundary>
              ) : null}
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
            Updated Successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Drawer>
  );
};

export default UpdateSchedule;
