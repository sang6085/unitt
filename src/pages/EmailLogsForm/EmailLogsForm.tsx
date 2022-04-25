/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Paper,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  getByIdEmailTemplates,
  insertEmailTemplate,
  updateEmailTemplate,
} from "services/EmailTemplateService";
import EditorComponent from "components/Editor/Editor";
import { ErrorBoundary } from "react-error-boundary";
import FallBackComponent from "components/FallBackComponent/FallBackComponent";
import { errorHandle } from "utils/helper";
import { Fragment, useEffect, useState } from "react";
import { useStyles } from "pages/EmailLogsForm/EmailLogsFormStyle";

interface IData {
  templateCode: string;
  templateName: string;
  templateType: string;
  subject: string;
  editor?: string;
}
const EmailLogsForm = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const classes=useStyles()
  const [value, setValue] = useState<string>("");

  const [id, setId] = useState<number>(-1);
  const [data, setData] = useState<IData>({
    templateCode: "",
    templateName: "",
    templateType: "",
    subject: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<number>(1);
  const [emailType, setEmailType] = useState<string>("event");

  useEffect(() => {
    function getData() {
      if (location.pathname.slice(1).split("/")[2]) {
        setId(Number(location.pathname.slice(1).split("/")[2]));
        getByIdEmailTemplates({ id: Number(location.pathname.slice(1).split("/")[2]) }).subscribe(
          (response: any) => {
            // console.log(response);

            if (response) {
              console.log("a",response.data.data.templateContent);
              
              setData({
                templateCode: response.data.templateCode,
                templateName: response.data.templateName,
                templateType: response.data.data.templateType,
                subject: response.data.subject,
              });
              setValue(response.data.data.templateContent);
              setActive(response.data.actived);
            }
          }
        );
      }
      setLoading(false);
    }

    getData();
  }, [location.pathname]);

  const handleChangeEmail = (event: SelectChangeEvent) => {
    setEmailType(event.target.value as string);
  };

  const handleChangeValue = (content: any, editor: any) => {
    setValue(content);
  };

  const { register, handleSubmit } = useForm<IData>();

  const onSubmit = handleSubmit((data) => {
    if (id === -1) {
      insertEmailTemplate({
        templateName: data.templateName,
        templateContent: value,
        subject: data.subject,
        templateCode: data.templateCode,
        templateType: data.templateType,
      });
    } else {
      updateEmailTemplate({
        id: id,
        templateName: data.templateName,
        templateContent: value,
        subject: data.subject,
        templateCode: data.templateCode,
        templateType: data.templateType,
        actived: active,
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      {!loading ? (
        <Box>
          <Box className={classes.itemsEnd}>
            <Button variant="contained" type="submit">
              {id !== -1 ? t("button.save") : t("button.add")}
            </Button>
          </Box>
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={1}>
              <Fragment>
                <Grid item xs={2}>
                  {t("emailTemplates.code")}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("templateCode")}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Code"
                    defaultValue={data.templateCode}
                  />
                </Grid>
                <Grid item xs={3} />
              </Fragment>
              <Fragment>
                <Grid item xs={2}>
                  {t("emailTemplates.template_name")}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("templateName")}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Name"
                    defaultValue={data.templateName}
                  />
                </Grid>
                <Grid item xs={3} />
              </Fragment>{" "}
              <Fragment>
                <Grid item xs={2}>
                  {t("emailTemplates.type")}
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <Select
                      {...register("templateType")}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={emailType}
                      onChange={handleChangeEmail}
                    >
                      <MenuItem value={"event"}>Event</MenuItem>
                      <MenuItem value={"ivitation"}>IVITATION</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3} />
              </Fragment>
              <Fragment>
                <Grid item xs={2}>
                  {t("emailTemplates.active")} / {t("emailTemplates.inactive")}
                </Grid>
                <Grid item xs={6}>
                  <ButtonGroup disableElevation variant="contained">
                    <Button
                      variant={active ? "contained" : "outlined"}
                      onClick={() => setActive(1)}
                    >
                      {t("emailTemplates.active")}
                    </Button>
                    <Button
                      variant={!active ? "contained" : "outlined"}
                      onClick={() => setActive(0)}
                    >
                      {t("emailTemplates.inactive")}
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={3} />
              </Fragment>
              <Fragment>
                <Grid item xs={2}>
                  {t("emailTemplates.subject")}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("subject")}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Subject"
                    defaultValue={data.subject}
                  />
                </Grid>
                <Grid item xs={3} />
              </Fragment>
            </Grid>
            <Box mt={2}>
              <ErrorBoundary FallbackComponent={FallBackComponent} onError={errorHandle}>
                <EditorComponent value={value} handleChangeValue={handleChangeValue} />
              </ErrorBoundary>
            </Box>
          </Paper>
        </Box>
      ) : null}
    </form>
  );
};

export default EmailLogsForm;
