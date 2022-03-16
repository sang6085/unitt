import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import { getDataPermission } from "../../services/PermissionManagerService";
import { SubmitHandler, useForm } from "react-hook-form";
import Progress from "../../components/Loading/Loading";

interface IPData {
  id: number;
  codePermission: string;
  namePermission: string;
  description: string;
  nameCompany: string;
  status: number;
}
const useStyles = makeStyles({
  boxHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  box: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    minWidth: 200,
    fontSize: "14px !important",
    fontWeight: "bold",
  },
  boxBtn: {
    display: "flex",
    justifyContent: "center",
  },
  description: {
    "& div": {
      height: "73%",
      display: "flex",
      alignItems: "flex-start",
    },
  },
});

const PermissionDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const classes = useStyles();
  const [mode, setMode] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dataDetails, setDataDetails] = React.useState<IPData | undefined>();

  React.useEffect(() => {
    async function getData() {
      if (location.pathname.slice(1).split("/")[1] || location.pathname.slice(1).split("/")[2]) {
        // console.log(location.pathname.slice(1).split("/")[1]);
        setMode(location.pathname.slice(1).split("/")[1]);
        getDataPermission().subscribe((response: any) => {
          if (response.data.data) {
            // eslint-disable-next-line array-callback-return
            response?.data.data.map((item: any, index: any) => {
              if (item.id === Number(location.pathname.slice(1).split("/")[2])) {
                setDataDetails(item);
              }
            });
            setLoading(false);
          }
        });
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, loading]);

  const { register, handleSubmit } = useForm<IPData>();

  const onSubmitCreate: SubmitHandler<IPData> = (data) => {
    console.log(data);
  };
  const onSubmitEdit: SubmitHandler<IPData> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      {!loading ? (
        <Box>
          {mode === "view" ? (
            <Box>
              {/* View Permission */}
              <Paper sx={{ p: 4 }} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={7}>
                    <Box sx={{ mb: 2 }}>
                      <FormLabel>{t(`permission_manager.code_permission`)}</FormLabel>
                      <TextField
                        sx={{ mt: 0.5 }}
                        disabled
                        fullWidth
                        size="small"
                        // variant="standard"
                        defaultValue={dataDetails?.codePermission}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <FormLabel>{t(`permission_manager.name_company`)}</FormLabel>
                      <TextField
                        sx={{ mt: 0.5 }}
                        disabled
                        fullWidth
                        size="small"
                        defaultValue={dataDetails?.nameCompany}
                      />
                    </Box>
                    <Box>
                      <FormLabel>{t(`permission_manager.name_permission`)}</FormLabel>
                      <TextField
                        disabled
                        sx={{ mt: 0.5 }}
                        size="small"
                        fullWidth
                        defaultValue={dataDetails?.namePermission}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ mb: 3, height: "73%", margin: 0 }}>
                      <FormLabel>{t(`permission_manager.description`)}</FormLabel>
                      <TextField
                        className={classes.description}
                        sx={{ height: "100%" }}
                        disabled
                        multiline
                        minRows={1}
                        fullWidth
                        size="small"
                        defaultValue={dataDetails?.description}
                      />
                    </Box>
                    <Stack direction="column">
                      <FormLabel> {t(`permission_manager.status`)}</FormLabel>
                      <Switch
                        defaultChecked={Boolean(dataDetails?.status)}
                        disabled
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
              {/* View Permission */}
            </Box>
          ) : mode === "edit" ? (
            <Box>
              {/* Edit Permission */}
              <Box className={classes.boxHeader}></Box>
              <Paper sx={{ px: 5, py: 3 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: 16,
                      mb: 4,
                      width: "auto",
                    }}
                  >
                    {t("permission_manager.update_permission")}
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmitEdit)}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <Box sx={{ mb: 2 }}>
                        <FormLabel > {t(`permission_manager.code_permission`)}</FormLabel>
                        <TextField
                          disabled
                          sx={{mt:0.5}}
                          fullWidth
                          size="small"
                          defaultValue={dataDetails?.codePermission}
                          {...register("codePermission")}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <FormLabel >{t(`permission_manager.name_company`)}</FormLabel>
                        <TextField
                          sx={{ mt: 0.5 }}
                          disabled
                          fullWidth
                          size="small"
                          defaultValue={dataDetails?.nameCompany}
                        />
                      </Box>

                      <Box>
                        <FormLabel>{t(`permission_manager.name_permission`)}</FormLabel>
                        <TextField
                          {...register("namePermission")}
                          size="small"
                          sx={{mt:0.5}}
                          fullWidth
                          defaultValue={dataDetails?.namePermission}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ mb: 2 }}>
                        <FormLabel> {t(`permission_manager.description`)}</FormLabel>
                        <TextField
                          multiline
                          minRows={5}
                          fullWidth
                          sx={{mt:0.5}}
                          size="small"
                          defaultValue={dataDetails?.description}
                          {...register("description")}
                        />
                      </Box>
                      <Box sx={{display: 'flex', flexDirection:"column"}}>
                        <FormLabel>{t(`permission_manager.status`)}</FormLabel>
                        <Switch {...register("status")} defaultChecked={Boolean(dataDetails?.status)} />
                    </Box>
                    </Grid>
                    <Grid xs={12} item>
                      <Box className={classes.boxBtn}>
                        <Button sx={{ mr: 3, textTransform: "none" }} variant="outlined">
                          {t("button.reset")}
                        </Button>
                        <Button variant="contained" type="submit" sx={{ textTransform: "none" }}>
                          {t("permission_manager.btn_save")}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
              {/* End Permission */}
            </Box>
          ) : (
            <Box>
              <form onSubmit={handleSubmit(onSubmitCreate)}>
                <Box>
                  <Paper sx={{ px: 5, py: 3 }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontSize: 16,
                          mb: 5,
                          width: "auto",
                        }}
                      >
                        {t("permission_manager.create_permission")}
                      </Typography>
                    </Box>

                    <Grid container spacing={5}>
                      <Grid item xs={6}>
                        <Box className={classes.box}>
                          <Typography className={classes.title}>
                            {t(`permission_manager.code_permission`)}
                          </Typography>
                          <TextField
                            disabled
                            fullWidth
                            size="small"
                            {...register("codePermission")}
                          />
                        </Box>
                        <Box className={classes.box}>
                          <Typography className={classes.title}>
                            {t(`permission_manager.description`)}
                          </Typography>

                          <TextField
                            multiline
                            minRows={3}
                            fullWidth
                            size="small"
                            {...register("description")}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box className={classes.box}>
                          <Typography className={classes.title}>
                            {t(`permission_manager.name_permission`)}
                          </Typography>
                          <TextField size="small" fullWidth {...register("namePermission")} />
                        </Box>
                        <Box className={classes.box}>
                          <Typography className={classes.title}>
                            {t(`permission_manager.status`)}
                          </Typography>
                          <Checkbox />
                        </Box>
                      </Grid>
                      <Grid xs={12} item>
                        <Box className={classes.boxBtn}>
                          <Button sx={{ mr: 3, textTransform: "none" }} variant="outlined">
                            {t("button.reset")}
                          </Button>
                          <Button variant="contained" type="submit" sx={{ textTransform: "none" }}>
                            {t("permission_manager.btn_save")}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </form>
            </Box>
          )}

          {/* End view Permission */}
        </Box>
      ) : (
       <Progress />
      )}
    </Box>
  );
};

export default PermissionDetails;
