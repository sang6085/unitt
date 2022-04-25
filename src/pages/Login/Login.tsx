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
import CssBaseline from "@mui/material/CssBaseline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { login } from "services/AccountService";
import { useAppDispatch, useAppSelector } from "stores/Store";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppURL } from "configs/consts";
import UnitIcon from "assets/logo/unit.png";
import { useState, useEffect } from "react";
import { useStyles } from "pages/Login/LoginStyle";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { setToken } from "pages/Login/LoginSlice";

interface ILogin {
  userName: string;
  password: string;
}


const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.login.authToken);
  const styles = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");

  const vertical = "top";
  const horizontal = "right";

  useEffect(() => {
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

  const handleSignUp = (data: ILogin) => {
    setLoading(true);

    login({ username: data.userName, password: data.password }).subscribe(
      (response: any) => {
        if (response.data.success) {
          setLoading(false);
          dispatch(
            setToken({
              token: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
            })
          );
        } else {
          setLoading(false);
        }
      }
    );
  };

  const handleCloseAlert = () => {
    setAlertText("");
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Box className={styles.root}>
        <CssBaseline />
        <Box className={styles.layout}>
          <Box className={styles.wrapperImg}>
            <Box className={styles.boxImg}>
              <img
                src={UnitIcon}
                alt=""
                className={styles.logoImg}
                width="50%"
              />
            </Box>
          </Box>
          <Box className={styles.boxContent}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                className={styles.wrapperTitleHeader}
              >
                <Typography className={styles.titleHeader}>
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
                <Typography className={styles.errValidation}>
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
                <Typography className={styles.errValidation}>
                  {errors?.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={styles.itemsCenter}>
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
                className={styles.itemsCenter}
              >
                <LoadingButton
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  fullWidth
                  sx={{
                    background: loading ? "#a2ceff !important" : "#1565c0",
                  }}
                >
                  {t("login.btn_login")}
                </LoadingButton>
              </Grid>

              <Grid item xs={12} className={styles.pb}>
                <Box
                  className={styles.wrapperFooter}
                >
                  <Typography
                    variant="body2"
                    className={styles.titleFooter}
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
          >
            {alertText}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};

export default Login;
