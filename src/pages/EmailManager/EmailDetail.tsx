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
import { SubmitHandler, useForm } from "react-hook-form";
import Progress from "components/Loading/Loading";
import { cancelToken } from "api/common";
import { useStyles } from "pages/EmailManager/EmailStyle";
import EditorComponent from "components/Editor/Editor";
import { getEmailById } from "services/EmailService";
import { useEffect, useState } from "react";
interface IData {
  id: number;
  to: string;
  cc: string;
  subject: string;
}

const EmailDetail = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { register, handleSubmit, setValue } = useForm<IData>();

  useEffect(() => {
    function getData() {
      getEmailById().subscribe((response: any) => {
        if (response.data.data) {
          // eslint-disable-next-line array-callback-return
          response?.data.data.map((item: any, index: any) => {
            if (item.id === Number(location.pathname.slice(1).split("/")[2])) {
              setValue("to", item.to);
              setValue("cc", item.cc);
              setValue("subject", item.subject);
              setContent(item.content);
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
  const [content, setContent] = useState<string>("");
  const handleChangeContent = (content: any, editor: any) => {
    setContent(content);
  };
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
                  <Divider className={classes.dividerDetail} />
                </Grid>
                <Grid item xs={12}>
                  <Box mb={2}>
                    <FormLabel>To</FormLabel>
                    <TextField
                      className={classes.textField}
                      fullWidth
                      size="small"
                      {...register("to")}
                    />
                  </Box>

                  <Box>
                    <FormLabel>CC</FormLabel>
                    <TextField
                      {...register("cc")}
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <FormLabel>Subject</FormLabel>
                    <TextField
                      fullWidth
                      className={classes.textField}
                      size="small"
                      {...register("subject")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box mb={2}>
                  <FormLabel>Content</FormLabel>
                    <EditorComponent
                      value={content}
                      handleChangeValue={handleChangeContent}
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

export default EmailDetail;
