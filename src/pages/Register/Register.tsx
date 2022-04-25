import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useStyles } from "./RegisterStyles";
import { FC } from "react";

const Register: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("error.field_required")),
    email: Yup.string().required(t("error.field_required")),
    password: Yup.string()
      .required(t("error.field_required"))
      .min(6, `${t("error.notstrong")}`)
      .max(5, `${t("error.strong")}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Box className={classes.root}>
      <form onSubmit={onSubmit}>
        <Paper className={classes.paperContainer}>
          <Box className={classes.boxTitle}>
            <Typography>Sign up with credentials</Typography>
          </Box>
          <Box className={classes.layout}>
            <Box className={classes.boxInput}>
              <Box className={classes.boxChildInput}>
                <TextField
                  {...register("name", { required: true })}
                  className={classes.input}
                  placeholder="Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className={classes.errorsMessage}>
                  {errors?.name?.message}
                </Typography>
              </Box>
              <Box className={classes.boxChildInput}>
                <TextField
                  {...register("email", { required: true })}
                  className={classes.input}
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className={classes.errorsMessage}>
                  {errors?.email?.message}
                </Typography>
              </Box>
              <Box className={classes.boxChildInput}>
                <TextField
                  {...register("password", { required: true })}
                  className={classes.input}
                  placeholder="Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className={classes.errorsMessage}>
                  {errors?.password?.message !== t("error.notstrong") &&
                    errors?.password?.message !== t("error.strong") &&
                    errors?.password?.message}
                </Typography>
              </Box>
              <Box className={classes.boxSecurePw}>
                <Typography className={classes.passwordStrength}>
                  password strength:{" "}
                </Typography>
                <Typography
                  className={
                    errors?.password?.message === t("error.notstrong")
                      ? classes.colorErrPassword
                      : classes.colorPassword
                  }
                >
                  {errors?.password?.message !== t("error.field_required") &&
                    errors?.password?.message}
                </Typography>
              </Box>
              <Box className={classes.boxCheckbox}>
                <Checkbox defaultChecked />
                <Typography className={classes.agree}>I agree with </Typography>
                <Typography className={classes.privacyPolicy}>
                  Privacy Policy
                </Typography>
              </Box>
            </Box>

            <Box className={classes.boxBtn}>
              <Button
                type="submit"
                className={classes.btnRegister}
                variant="contained"
              >
                {t(`button.create_acc`)}
              </Button>
            </Box>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default Register;
