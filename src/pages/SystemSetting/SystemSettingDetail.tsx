import {
  Box,
  Divider,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import { SubmitHandler, useForm } from "react-hook-form";
import Progress from "components/Loading/Loading";
import { useStyles } from "pages/SystemSetting/SystemSettingStyles";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { getDataSystemSetting } from "services/SystemSettingsService";
import { useState, useEffect } from "react";
interface IPData {
  keys: string;
  values: string;
  description: string;
}

const SystemSettingDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const classes = useStyles();
  const [mode, setMode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { register, handleSubmit, reset, setValue } = useForm<IPData>();

  useEffect(() => {
    function getData() {
      if (
        location.pathname.slice(1).split("/")[1] ||
        location.pathname.slice(1).split("/")[2]
      ) {
        // console.log(location.pathname.slice(1).split("/")[1]);
        setMode(location.pathname.slice(1).split("/")[1]);
        getDataSystemSetting().subscribe((response: any) => {
          if (response.data.data) {
            // eslint-disable-next-line array-callback-return
            response?.data.data.map((item: any, index: any) => {
              if (
                Number(item.id) ===
                Number(location.pathname.slice(1).split("/")[2])
              ) {
                setValue("keys", item.keys);
                setValue("values", item.values);
                setValue("description", item.description);
              }
            });
            setLoading(false);
          }
        });
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onSubmit: SubmitHandler<IPData> = (data) => {
    console.log(data);
  };

  const handleRenderTitle = () => {
    if (mode === "view") {
      return t("system_settings.title_detail");
    } else
      return mode === "edit"
        ? t("system_settings.title_edit")
        : t("system_settings.title_create");
  };

  return (
    <Box>
      {!loading ? (
        <Box>
          {/* Edit Permission */}
          <Box className={classes.boxHeader}></Box>
          <Paper className={classes.paper} elevation={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">{handleRenderTitle()}</Typography>
                  <Divider sx={{ mt: 1, mb: 0 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <FormLabel> {t(`system_settings.keys`)}</FormLabel>
                    <TextField
                      disabled={mode === "view" || mode === "edit"}
                      className={classes.textField}
                      fullWidth
                      size="small"
                      {...register("keys")}
                    />
                  </Box>
                  <Box mb={2}>
                    <FormLabel>{t(`system_settings.values`)}</FormLabel>
                    <TextField
                      className={classes.textField}
                      disabled={mode === "view" || mode === "edit"}
                      fullWidth
                      size="small"
                      {...register("values")}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <FormLabel> {t(`system_settings.description`)}</FormLabel>
                    <TextField
                      multiline
                      minRows={5}
                      fullWidth
                      disabled={mode === "view"}
                      className={classes.textField}
                      size="small"
                      {...register("description")}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} item>
                  {mode !== "view" ? (
                    <Box className={classes.boxBtn}>
                      <ButtonComponent
                        onClick={() => reset()}
                        type="reset"
                        color="secondary"
                        variant="contained"
                      >
                        {t("button.reset")}
                      </ButtonComponent>
                      <ButtonComponent
                        variant="contained"
                        type="submit"
                        className={classes.saveBtn}
                      >
                        {t("system_settings.btn_save")}
                      </ButtonComponent>
                    </Box>
                  ) : null}
                </Grid>
              </Grid>
            </form>
          </Paper>
          {/* End Permission */}
        </Box>
      ) : (
        <Progress />
      )}
    </Box>
  );
};

export default SystemSettingDetails;
