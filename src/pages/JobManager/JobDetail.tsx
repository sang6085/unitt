import {
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getDataPermission } from "services/PermissionManagerService";
import { SubmitHandler, useForm } from "react-hook-form";
import Progress from "components/Loading/Loading";
import { cancelToken } from "api/common";
import { useStyles } from "pages/JobManager/JobStyle";
import { useState, useEffect, Fragment } from "react";

interface IData {
  id: number;
  jobName: string;
  cronExpression: string;
  description: string;
}

const JobDetail = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { register, handleSubmit, setValue } = useForm<IData>();

  useEffect(() => {
    function getData() {
      getDataPermission().subscribe((response: any) => {
        if (response.data.data) {
          // eslint-disable-next-line array-callback-return
          response?.data.data.map((item: any, index: any) => {
            if (item.id === Number(location.pathname.slice(1).split("/")[2])) {
              setValue("jobName", item.codePermission);
              setValue("cronExpression", item.nameCompany);
              setValue("description", item.description);
            }
          });
          setLoading(false);
        }
      });
    }
    getData();
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<IData> = (data) => {
    console.log(data);
  };
  const cronExpsDetailInfo = [
    { key: "* * * ? * *", value: "Every second" },
    { key: "0 * * ? * *", value: "Every minute" },
    { key: "0 */2 * ? * *", value: "Every even minute" },
    { key: "0 1/2 * ? * *", value: "Every uneven minute" },
    { key: "0 */2 * ? * *", value: "Every 2 minutes" },
    { key: "0 */3 * ? * *", value: "Every 3 minutes" },
    { key: "0 */4 * ? * *", value: "Every 4 minutes" },
    { key: "0 */5 * ? * *", value: "Every 5 minutes" },
    { key: "0 */10 * ? * *", value: "Every 10 minutes" },
    { key: "0 */15 * ? * *", value: "Every 15 minutes" },
    { key: "0 */30 * ? * *", value: "Every 30 minutes" },
    { key: "0 15,30,45 * ? * *", value: "Every hour at minutes 15, 30 and 45" },
    { key: "0 0 * ? * *", value: "Every hour" },
  ];
  return (
    <Box>
      {!loading ? (
        <Box>
          <Box className={classes.boxHeader}></Box>
          <Paper className={classes.paper} elevation={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {t("permission_manager.title_edit")}
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 0 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <FormLabel>{t("job_manager.name")}</FormLabel>
                    <TextField
                      className={classes.textField}
                      disabled={true}
                      fullWidth
                      size="small"
                      {...register("jobName")}
                    />
                  </Box>

                  <Box>
                    <FormLabel>{t("job_manager.cron_expression")}</FormLabel>
                    <TextField
                      {...register("cronExpression")}
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <FormLabel> {t("job_manager.description")}</FormLabel>
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
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {t("job_manager.cronjob_expression_detail_info")}
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 3 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <Typography gutterBottom className={classes.titleCronjob}>
                            {t("job_manager.expression")}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography gutterBottom className={classes.titleCronjob}>
                            {t("job_manager.meaning")}
                          </Typography>
                        </Grid>
                        {cronExpsDetailInfo.map((item: any, index: number) => {
                          return (
                            <Fragment key={index}>
                              <Grid item xs={4} className={classes.wrapperTitleKey}>
                                <Typography className={classes.titleCronjob}>
                                  {item.key}
                                </Typography>
                              </Grid>
                              <Grid item xs={8} className={classes.wrapperTitleKey}>
                                <Typography>{item.value}</Typography>
                              </Grid>
                            </Fragment>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <Typography gutterBottom className={classes.titleCronjob}>
                          {t("job_manager.expression")}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography gutterBottom className={classes.titleCronjob}>
                          {t("job_manager.meaning")}
                          </Typography>
                        </Grid>
                        {cronExpsDetailInfo.map((item: any, index: number) => {
                          return (
                            <Fragment key={index}>
                              <Grid item xs={4} className={classes.wrapperTitleKey} >
                                <Typography className={classes.titleCronjob}>
                                  {item.key}
                                </Typography>
                              </Grid>
                              <Grid item xs={8} className={classes.wrapperTitleKey}>
                                <Typography>{item.value}</Typography>
                              </Grid>
                            </Fragment>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      ) : (
        <Progress />
      )}
    </Box>
  );
};

export default JobDetail;
