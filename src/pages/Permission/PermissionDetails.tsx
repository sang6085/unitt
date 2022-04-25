import {
  Box,
  Divider,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { getDataPermission } from "services/PermissionManagerService";
import { SubmitHandler, useForm } from "react-hook-form";
import Progress from "components/Loading/Loading";
import { useStyles } from "pages/Permission/PermissionStyles";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
interface IData {
  id: number;
  codePermission: string;
  namePermission: string;
  description: string;
  nameCompany: string;
  status: number;
}

const PermissionDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const classes = useStyles();
  const [mode, setMode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { register, handleSubmit, reset, setValue } = useForm<IData>();

  useEffect(() => {
    function getData() {
      if (
        location.pathname.slice(1).split("/")[1] ||
        location.pathname.slice(1).split("/")[2]
      ) {
        // console.log(location.pathname.slice(1).split("/")[1]);
        setMode(location.pathname.slice(1).split("/")[1]);
        getDataPermission().subscribe((response: any) => {
          if (response.data.data) {
            // eslint-disable-next-line array-callback-return
            response?.data.data.map((item: any, index: any) => {
              if (
                item.id === Number(location.pathname.slice(1).split("/")[2])
              ) {
                setValue("codePermission", item.codePermission);
                setValue("nameCompany", item.nameCompany);
                setValue("namePermission", item.namePermission);
                setValue("description", item.description);
                setValue("status", item.status);
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

  const onSubmit: SubmitHandler<IData> = (data) => {
    console.log(data);
  };

  const renderTitleMode = () => {
    if (mode === "view") {
      return t("permission_manager.title_detail");
    } else
      return mode === "edit"
        ? t("permission_manager.title_edit")
        : t("permission_manager.title_create");
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
                  <Typography variant="h6">{renderTitleMode()}</Typography>
                  <Divider className={classes.dividerDetail} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <FormLabel>
                      {" "}
                      {t(`permission_manager.code_permission`)}
                    </FormLabel>
                    <TextField
                      disabled={mode === "view" || mode === "edit"}
                      className={classes.textField}
                      fullWidth
                      size="small"
                      {...register("codePermission")}
                    />
                  </Box>
                  <Box mb={2}>
                    <FormLabel>
                      {t(`permission_manager.name_company`)}
                    </FormLabel>
                    <TextField
                      className={classes.textField}
                      disabled={mode === "view" || mode === "edit"}
                      fullWidth
                      size="small"
                      {...register("nameCompany")}
                    />
                  </Box>

                  <Box>
                    <FormLabel>
                      {t(`permission_manager.name_permission`)}
                    </FormLabel>
                    <TextField
                      {...register("namePermission")}
                      size="small"
                      disabled={mode === "view"}
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <FormLabel>
                      {" "}
                      {t(`permission_manager.description`)}
                    </FormLabel>
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
                  <Stack direction={"column"}>
                    <FormLabel>{t(`permission_manager.status`)}</FormLabel>
                    <Switch
                      {...register("status")}
                      disabled={mode === "view"}
                    />
                  </Stack>
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
                        {t("permission_manager.btn_save")}
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

export default PermissionDetails;
