/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  InputAdornment,
  OutlinedInput,
  Typography,
  Alert,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  FormControl,
  Snackbar,
} from "@mui/material";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { login } from "../../services/AccountService";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppURL } from "../../configs/consts";
import UnitIcon from "../../assets/logo/unit.png";

import { useStyles } from "./LoginStyle";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface ILogin {
  userName: string;
  password: string;
}

const txt_gray = "#8898aa";

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
    if (authToken?.accessToken && auth.accessMenu.length > 0) {
      navigate(AppURL.DASHBOARD);
    }
  }, [auth.accessMenu.length, auth.token, authToken?.accessToken, navigate]);

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

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Box className={styles.root}>
        <CssBaseline />
        <Box className={styles.layout}>
          <Box
            sx={{
              px: 4,
              pb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <img
                src={UnitIcon}
                alt=""
                style={{ marginRight: 12 }}
                width="50%"
              />
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
                  sx={{ fontWeight: 500, color: txt_gray, fontSize: 15 }}
                >
                  {t("login.sign_in_to_your_account")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("userName")}
                  fullWidth
                  name="userName"
                  size="small"
                  placeholder="Email"
                  error={errors.userName ? true : false}
                />
                <Typography sx={{ color: "red", fontSize: 13 }}>
                  {errors?.userName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <OutlinedInput
                    {...register("password")}
                    fullWidth
                    name="password"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.password")}
                    error={errors.password ? true : false}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Typography sx={{ color: "red", fontSize: 13 }}>
                  {errors?.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    className={styles.checkbox}
                    label={t("login.remember") as string}
                    control={<Checkbox />}
                  />
                  <Link to="#" className={styles.transformLink}>
                    {t("login.forgot_password")}
                  </Link>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ my: 1, display: "flex", justifyContent: "center" }}
              >
                <LoadingButton
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  fullWidth
                  className={styles.btnLogin}
                >
                  {t("login.btn_login")}
                </LoadingButton>
              </Grid>

              <Grid item xs={12} sx={{ paddingBottom: " 20px" }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", flexGrow: 1 }}
                  >
                    {t("login.dont_have_an_account_yet")}
                  </Typography>
                  <Link to="/register" className={styles.transformLink}>
                    {t("login.create")}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
