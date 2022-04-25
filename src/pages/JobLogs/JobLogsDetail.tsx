import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useStyles } from "pages/JobLogs/JobLogsStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState, ChangeEvent } from "react";

const JobLogsDetail = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  const navigate = useNavigate();

  const scheduleGroups = [
    { id: "atTenAM", name: "AT 10:00 AM" },
    { id: "every10m", name: "Every 10 minutes" },
  ];

  const schema = yup.object().shape({
    jobName: yup.string().required(t("error.field_required")),
    description: yup.string(),
    scheduleName: yup.string().required(t("error.field_required")),
    dateStart: yup.string().required(t("error.field_required")),
    timeStart: yup.string().required(t("error.field_required")),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobName: "",
      description: "",
      scheduleName: "atTenAM",
      dateStart: new Date(),
      timeStart: new Date(),
    },
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [scheduleType, setScheduleType] = useState("oneTime");

  const handleChangeSchedule = (event: ChangeEvent<HTMLInputElement>) => {
    setScheduleType((event.target as HTMLInputElement).value);
  };
  return (
    <Box>
      <Box>
        <Box className={classes.boxHeader}></Box>
        <Paper className={classes.paper} elevation={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {t("permission_manager.title_detail")}
                </Typography>
                <Divider className={classes.dividerDetail} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={2}>
                  <FormLabel>{t("job_logs_manager.job_name")}</FormLabel>

                  <TextField
                    {...register("jobName")}
                    variant="outlined"
                    fullWidth
                    name="jobName"
                    size="small"
                    error={errors.jobName ? true : false}
                    helperText={errors?.jobName?.message}
                  />
                </Box>
                <Box mb={2}>
                  <FormLabel>{t("job_logs_manager.description")}</FormLabel>
                  <TextField
                    multiline
                    minRows={5}
                    fullWidth
                    className={classes.textField}
                    size="small"
                    {...register("description")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={2}>
                  <FormLabel>{t("job_logs_manager.schedule_type")}</FormLabel>
                  <RadioGroup
                    row
                    value={scheduleType}
                    onChange={handleChangeSchedule}
                  >
                    <FormControlLabel
                      value="immediate"
                      control={<Radio />}
                      label={t("job_logs_manager.immediate") as string}
                    />
                    <FormControlLabel
                      value="oneTime"
                      control={<Radio />}
                      label={t("job_logs_manager.one_time") as string}
                    />
                    <FormControlLabel
                      value="recurring"
                      control={<Radio />}
                      label={t("job_logs_manager.recurring") as string}
                    />
                  </RadioGroup>
                </Box>
                {scheduleType === "recurring" && (
                  <Box mb={2}>
                    <FormLabel>{t("job_logs_manager.schedule_name")}</FormLabel>
                    <Autocomplete
                      size="small"
                      {...register("scheduleName")}
                      defaultValue={scheduleGroups[0]}
                      options={scheduleGroups}
                      fullWidth
                      getOptionLabel={(option: any) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          name="scheduleName"
                          error={errors.scheduleName ? true : false}
                          helperText={(errors?.scheduleName as any)?.message}
                        />
                      )}
                    />
                  </Box>
                )}
                {scheduleType === "oneTime" && (
                  <>
                    <Box mb={2}>
                      <FormLabel>{t("job_logs_manager.date_start")}</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={watch("dateStart")}
                          onChange={(newValue: any) => {
                            setValue("dateStart", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("dateStart")}
                              size="small"
                              fullWidth
                              error={errors.dateStart ? true : false}
                              helperText={errors?.dateStart?.message}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Box mb={2}>
                      <FormLabel>{t("job_logs_manager.time")}</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          value={watch("timeStart")}
                          onChange={(newValue: any) => {
                            setValue("timeStart", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              {...register("timeStart")}
                              fullWidth
                              error={errors.timeStart ? true : false}
                              helperText={errors?.timeStart?.message}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </>
                )}
              </Grid>

              <Grid xs={12} item>
                <Box className={classes.boxBtn}>
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    {t("button.cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.saveBtn}
                  >
                    {t("permission_manager.btn_save")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default JobLogsDetail;
