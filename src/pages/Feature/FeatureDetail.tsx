import { Box, Button, FormLabel, Grid, Paper, Stack, Switch, TextField } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import Progress from "../../components/Loading/Loading";
import { getFeatureById } from "../../services/FeatureService";
interface IFormInput {
  id: number | string;
  featureId: string;
  featureName: string;
  description: string;
  featureType: string;
  status: boolean;
}

const FeatureForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const mode = location.pathname.slice(1).split("/")[1];
  const [status, setStatus] = React.useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    defaultValues: {
      id: "",
      featureId: "",
      featureName: "",
      description: "",
      featureType: "",
      status: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  React.useEffect(() => {
    setLoading(true);
    if ((id && mode === "view") || mode === "edit") {
      getFeatureById({ id: id }).subscribe((res: any) => {
        setValue("id", id);
        setValue("featureId", res?.data.featureId);
        setValue("featureName", res?.data.featureName);
        setValue("description", res?.data.description);
        setValue("featureType", res?.data.featureType);
        setValue("status", res?.data.status);
        setStatus(res?.data.status);
        setLoading(false);
      });
    } else {
      setValue("id", "");
      setValue("featureId", "");
      setValue("featureName", "");
      setValue("description", "");
      setValue("featureType", "");
      setValue("status", false);
      setLoading(false);
    }
  }, [id, mode, setValue]);

  return (
    <Box>
      {!loading ? (
        <Paper sx={{ p: 4 }} elevation={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box>
                    <FormLabel>{t("feature.id")}</FormLabel>
                    <TextField {...register("id")} type="text" size="small" fullWidth disabled />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <FormLabel>{t("feature.code_feature")}</FormLabel>
                    <TextField
                      {...register("featureId")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <FormLabel>{t("feature.name_feature")}</FormLabel>
                    <TextField
                      {...register("featureName")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <FormLabel>{t("feature.type_feature")}</FormLabel>
                    <TextField
                      {...register("featureType")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <FormLabel>{t("feature.description")}</FormLabel>
                    <TextField
                      {...register("description")}
                      type="text"
                      size="small"
                      fullWidth
                      disabled={mode === "view"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="column">
                    <FormLabel>{t("feature.status")}</FormLabel>
                    <Switch
                      {...register("status")}
                      disabled={mode === "view"}
                      defaultChecked={status}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            {mode !== "view" ? (
              <Stack direction="row" justifyContent={"center"} mt={3}>
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
        <Progress />
      )}
    </Box>
  );
};

export default FeatureForm;
