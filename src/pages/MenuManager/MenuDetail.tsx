import { Box, Grid, Button, TextField, Switch, FormLabel, Paper, Stack } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getMenuById } from "../../services/MenuService";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import Progress from "../../components/Loading/Loading";

interface IFormInput {
  id: number | string;
  code: string;
  url: string;
  sort: number | string;
  isActive: boolean;
}

const MenuForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const location = useLocation();
  const { id } = useParams();
  const mode = location.pathname.slice(1).split("/")[1];
  const [status, setStatus] = React.useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    defaultValues: {
      id: "",
      code: "",
      url: "",
      sort: "",
      isActive: false,
    },
  });

  React.useEffect(() => {
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
  }, [id, mode, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <Box>
      {!loading ? (
        <Paper  sx={{ p: 4 }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box>
                    <FormLabel>ID</FormLabel>
                    <TextField {...register("id")} type="text" size="small" fullWidth disabled />
                  </Box>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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

                <Grid item xs={6}>
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
              <Stack direction="row" justifyContent={"center"} mt={2}>
                <Button type="reset" variant="outlined" sx={{ mx: 1 }}>
                  {t("button.reset")}
                </Button>
                <Button type="submit" variant="contained" sx={{ mx: 1 }}>
                  {t("button.save")}
                </Button>
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
