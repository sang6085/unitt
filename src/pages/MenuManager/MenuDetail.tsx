import { Box, Grid, TextField, Switch, FormLabel, Paper, Stack, Typography, Divider } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { getMenuById } from "services/MenuService";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import Progress from "components/Loading/Loading";
import { useStyles } from "pages/MenuManager/MenuStyles";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { useState, useEffect } from "react";

interface IFormInput {
  id: number | string;
  code: string;
  url: string;
  sort: number | string;
  isActive: boolean;
}

const MenuForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const classes = useStyles()
  const { id } = useParams();
  const mode = location.pathname.slice(1).split("/")[1];
  const [status, setStatus] = useState<boolean>(false);

  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>({
    defaultValues: {
      id: "",
      code: "",
      url: "",
      sort: "",
      isActive: false,
    },
  });

  useEffect(() => {
    setLoading(true);
    if ((id && mode === "view") || mode === "edit") {
      getMenuById(Number(id)).subscribe((res: any) => {
        setValue("id", id);
        setValue("code", res?.data.code);
        setValue("url", res?.data.url);
        setValue("sort", res?.data.sort);
        setValue("isActive", !!res?.data.isActive);
        setStatus(!!res?.data.status);
        setLoading(false);
      });
    } else {
      setLoading(true);
      setValue("id", "");
      setValue("code", "");
      setValue("url", "");
      setValue("sort", "");
      setValue("isActive", false);
      setLoading(false);
    }
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
  }, [id, mode, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <Box>
      {!loading ? (
        <Paper className={classes.paper} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="h6">Detail</Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormLabel>ID</FormLabel>
                    <TextField {...register("id")} type="text" size="small" fullWidth disabled />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormLabel>{t("menu_manager.code")}</FormLabel>
                    <TextField
                      {...register("code")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormLabel>{t("menu_manager.sort")}</FormLabel>
                    <TextField
                      {...register("sort")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormLabel>Url:</FormLabel>
                    <TextField
                      {...register("url")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="column">
                    <FormLabel>{t("menu_manager.status")}</FormLabel>
                    <Switch
                      {...register("isActive")}
                      defaultChecked={status}
                      disabled={mode === "view"}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            {mode !== "view" ? (
              <Stack direction="row" justifyContent={"flex-end"} mt={2}>
                <ButtonComponent onClick={() => reset()} variant="contained" color="secondary" className={classes.btnAction}>
                  {t("button.reset")}
                </ButtonComponent>
                <ButtonComponent type="submit" variant="contained" className={classes.btnAction}>
                  {t("button.save")}
                </ButtonComponent>
              </Stack>
            ) : null}
          </form>
        </Paper>
      ) : (
        <>
          <Progress />
        </>
      )}
    </Box>
  );
};

export default MenuForm;
