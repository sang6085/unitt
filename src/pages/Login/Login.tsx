/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  InputAdornment,
  Paper,
  Typography,
  Alert,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { login } from "../../services/AccountService";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppURL } from "../../configs/consts";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "../../assets/logo/google.png";
import GithubIcon from "../../assets/logo/github.png";

import LoadingButton from "@mui/lab/LoadingButton";
interface ILogin {
  userName: string;
  password: string;
}

const txt_gray = "#8898aa";
const blue = "#0a48b3";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
  },

  layout: {
    // padding: 40,
    display: "flex",
    flexDirection: "column",
    width: "85%",
    maxWidth: 445,
    maxHeight: 580,
    height: "85%",
    minHeight: 450,
    boxShadow: "0 0 1rem 0 rgb(177 184 191 / 15%) !important",
    background: "#f7fafc !important",
    border: "1px solid #9e9e9e30",
    // borderRadius: "15px !important",
  },

  footer: {
    width: "85%",
    maxWidth: 445,
  },

  otherLogin: {
    width: 130,
    height: 45,
    borderRadius: 5,
    margin: "0 5px",
    background: "#fff",
  },

  OtherLoginLink: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
    border: "1px solid #fff",
    borderRadius: "5px",
    fontWeight: 600,
    color: blue,
    fontSize: 14,

    "&:hover": {
      color: "#000",
      marginTop: -1,
      boxShadow: "-3px 7px 10px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
    },

    "&:active": {
      background: "#9e9e9e30",
    },
  },

  textfield: {
    background: "#fff",
    fontSize: 14,

    "& fieldset": {
      border: "none",
      boxShadow: "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
    },
    "& input": {
      fontSize: 13,
      color: txt_gray,
    },
  },

  checkbox: {
    color: txt_gray,
    "& span": {
      color: txt_gray,
      fontSize: 14,
    },
  },

  transformLink: {
    fontSize: 13,
    color: txt_gray,

    "&:hover": {
      color: "gray",
    },
  },
});

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.login.authToken);
  const styles = useStyles();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alertText, setAlertText] = React.useState<string>("");

  const vertical = "top";
  const horizontal = "right";

  React.useEffect(() => {
    if (authToken?.accessToken && auth.menuNumbers.length > 0) {
      navigate(AppURL.DASHBOARD);
    }
  }, [auth.menuNumbers.length, auth.token, authToken?.accessToken, navigate]);

  const schema = Yup.object().shape({
    userName: Yup.string().required(t("error.field_required")),
    password: Yup.string().required(t("error.field_required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data: ILogin) => {
    setLoading(true);

    let prevent: boolean = false;
    const fingerPrint = localStorage.getItem("fingerprint");
    if (
      fingerPrint &&
      JSON.parse(fingerPrint).visitorId === auth.visitorId &&
      JSON.parse(fingerPrint).loginFail >= 4
    ) {
      const getObject = JSON.parse(fingerPrint);
      const getDate = getObject.timestamp;
      prevent = new Date().getTime() < getDate;
    }

    if (!prevent) {
      dispatch(
        login({ username: data.userName, password: data.password })
      ).subscribe((response: any) => {
        // console.log(response);
        if (response.success === false) {
          setLoading(false);
          setAlertText("User Info Wrong!");
          const object = {
            visitorId: auth.visitorId,
            loginFail:
              fingerPrint && JSON.parse(fingerPrint).loginFail < 4
                ? JSON.parse(fingerPrint).loginFail + 1
                : 1,
            timestamp: new Date(new Date().getTime() + 30000).getTime(),
          };
          localStorage.setItem("fingerprint", JSON.stringify(object));
        } else {
          localStorage.removeItem("fingerprint");
        }
      });
    } else {
      setLoading(false);
      setAlertText("You have logged in more than allowed!");
    }
  };

  const handleCloseAlert = () => {
    setAlertText("");
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Box className={styles.root}>
        <CssBaseline />
        <Paper className={styles.layout}>
          <Box
            sx={{
              px: 4,
              py: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid #9e9e9e30",
            }}
          >
            <Typography sx={{ color: txt_gray, fontSize: 13 }}>
              Sign in with
            </Typography>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
              <Box className={styles.otherLogin}>
                <Link to="#" className={styles.OtherLoginLink}>
                  <img
                    src={GithubIcon}
                    alt=""
                    style={{ width: 18, height: 18, marginRight: 12 }}
                  />
                  Github
                </Link>
              </Box>
              <Box className={styles.otherLogin}>
                <Link to="#" className={styles.OtherLoginLink}>
                  <img
                    src={GoogleIcon}
                    alt=""
                    style={{ width: 18, height: 18, marginRight: 12 }}
                  />
                  Google
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              px: 4,
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mb: 2 }}
              >
                <Typography
                  sx={{ fontWeight: 500, color: txt_gray, fontSize: 13 }}
                >
                  Or sign in with credentials
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mx: 3 }}>
                <TextField
                  {...register("userName")}
                  fullWidth
                  name="userName"
                  placeholder="Email"
                  className={styles.textfield}
                  error={errors.userName ? true : false}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: txt_gray, fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography sx={{ color: "red", fontSize: 13 }}>
                  {errors?.userName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mx: 3 }}>
                <TextField
                  {...register("password")}
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={styles.textfield}
                  error={errors.password ? true : false}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: txt_gray, fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography sx={{ color: "red", fontSize: 13 }}>
                  {errors?.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mx: 3 }}>
                <FormControlLabel
                  className={styles.checkbox}
                  label="Remember me"
                  control={<Checkbox />}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ my: 1, display: "flex", justifyContent: "center" }}
              >
                <LoadingButton
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  sx={{
                    textTransform: "unset",
                    fontWeight: 600,
                    background: blue,
                  }}
                >
                  {t("login.btn_login")}
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box
          className={styles.footer}
          sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Link to="#" className={styles.transformLink}>
            Forgot password?
          </Link>
          <Link to="/register" className={styles.transformLink}>
            Create new account
          </Link>
        </Box>
        <Snackbar
          open={alertText.length > 0}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {alertText}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};

export default Login;
