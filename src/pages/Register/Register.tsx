import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface IPRegister {
  name: string;
  email: string;
  password: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "517px",
    minWidth: "540px",
    background: "blue",
    padding: 20,
    backgroundColor: "#f7fafc !important",
  },
  boxTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
  },
  boxInput: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    minHeight: 430,
    paddingTop: 50,
    width: "90%",
  },
  boxChildInput: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "26px !important",
  },
  input: {
    // marginBottom: "26px !important",
    backgroundColor: "white !important",

    "& :focus": {
      color: "#79838e",
    },

    "& fieldset": {
      fontSize: 14,
      border: "none",
      innerHeight: "46px",
      boxShadow: "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
    },
    "& input": {
      fontSize: 13,
      color: "#8898aa",
      paddingLeft: 10,
    },
    "& .css-ittuaa-MuiInputAdornment-root": {
      // color: "#adb5bd",
      color: "#79838e",
    },
    "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#79838e",
    },
  },
  boxSecurePw: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
  },

  boxCheckbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
    marginLeft: -6,
  },
  boxBtn: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
  },
});

const Register: React.FC = () => {
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
  const onSubmit = (data: IPRegister) => {
    // console.log(data);
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={0} className={classes.paperContainer}>
          <Box className={classes.boxTitle}>
            <Typography sx={{ fontSize: 13, color: "#8898aa" }}>
              Sign up with credentials
            </Typography>
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
                        <SchoolIcon sx={{ fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography sx={{ color: "red", fontSize: 11 }}>
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
                        <EmailIcon sx={{ fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography sx={{ color: "red", fontSize: 11 }}>
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
                        <LockOpenIcon sx={{ fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography sx={{ color: "red", fontSize: 11 }}>
                  {errors?.password?.message !== t("error.notstrong") &&
                    errors?.password?.message !== t("error.strong") &&
                    errors?.password?.message}
                </Typography>
              </Box>
              <Box className={classes.boxSecurePw}>
                <Typography
                  sx={{
                    fontSize: 13,
                    pr: 1,
                    fontStyle: "italic",
                    color: "#8898aa",
                  }}
                >
                  password strength:{" "}
                </Typography>
                <Typography
                  sx={{
                    color:
                      errors?.password?.message === t("error.notstrong")
                        ? "red !important"
                        : "#2dce89!important",
                    fontSize: 13,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  {errors?.password?.message !== t("error.field_required") &&
                    errors?.password?.message}
                </Typography>
              </Box>
              <Box className={classes.boxCheckbox}>
                <Checkbox defaultChecked />
                <Typography sx={{ pr: 1, fontSize: 14, color: "#8898aa" }}>
                  I agree with{" "}
                </Typography>
                <Typography
                  sx={{ cursor: "pointer", color: "blue", fontSize: 14 }}
                >
                  Privacy Policy
                </Typography>
              </Box>
            </Box>

            <Box className={classes.boxBtn}>
              <Button
                type="submit"
                sx={{
                  width: "30%",
                  textTransform: "none",
                  fontWeight: "bold",
                  height: "45px",
                }}
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
