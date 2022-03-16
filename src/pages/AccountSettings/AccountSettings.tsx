import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useStyles } from "./AccountSettingsStyle";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { getAccountSettingMock } from "../../services/AccountService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Progress from "../../components/Loading/Loading";
interface IShowPassword {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const im = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

interface IInfo {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phoneNumber: number | string;
  location: string;
  language: string;
  gender: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  birthDate: Date | string | null;
  skill: string[];
}

const AccountSettings = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState<IShowPassword>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const schema: SchemaOf<IInfo> = yup.object().shape({
    firstName: yup.string().required(t("error.field_required")),
    lastName: yup.string().required(t("error.field_required")),
    email: yup.string().required(t("error.field_required")),
    phoneNumber: yup.string().required(t("error.field_required")),
    location: yup.string().required(t("error.field_required")),
    language: yup.string().required(t("error.field_required")),
    confirmEmail: yup
      .string()
      .required(t("error.field_required"))
      .oneOf([yup.ref("email"), "Nhập lại email không khớp"]),
    currentPassword: yup.string().required(t("error.field_required")),
    newPassword: yup.string().required(t("error.field_required")),
    confirmPassword: yup
      .string()
      .required(t("error.field_required"))
      .oneOf([yup.ref("newPassword"), t("message.confirm_pass_fail")]),
    gender: yup.string().required(t("error.field_required")),
    birthDate: yup.string().required(t("error.field_required")),
    skill: yup.array().min(1, "Error"),
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IInfo>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      confirmEmail: "",
      gender: "",
      location: "",
      language: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      birthDate: "2014-08-18T21:11:54",
      skill: [],
    },
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const [birthDate, setbirthDate] = React.useState<Date | null>(new Date("2014-08-18T21:11:54"));
  const [skill, setSkill] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getAccountSettingMock().subscribe((resInfo: any) => {
      setSkill(resInfo.data.data.skill);
      // setGender(resInfo.data.data.sex);
      setValue("firstName", resInfo.data.data.firstName);
      setValue("lastName", resInfo.data.data.lastName);
      setValue("email", resInfo.data.data.email);
      setValue("phoneNumber", resInfo.data.data.phoneNumber);
      setValue("gender", resInfo.data.data.sex);
      setValue("location", resInfo.data.data.location);
      setValue("language", resInfo.data.data.language);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  
  React.useEffect(() => {
    setValue("skill", skill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  const onSubmit: SubmitHandler<IInfo> = (data) => {
    console.log(data);
  };

  const handleChangeBirthDate = (newValue: Date | null) => {
    setbirthDate(newValue);
  };

  const handleClickShowPassword = (name: string) => {
    name === "currentPassword"
      ? setShowPassword({
          ...showPassword,
          currentPassword: !showPassword.currentPassword,
        })
      : name === "newPassword"
      ? setShowPassword({
          ...showPassword,
          newPassword: !showPassword.newPassword,
        })
      : setShowPassword({
          ...showPassword,
          confirmPassword: !showPassword.confirmPassword,
        });
  };

  return (
    <Box>
      {!loading ? (
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <Paper className={classes.paperSpace}>
            <Typography variant="h6">{t("account_setting.basic_info")}</Typography>
            <Grid container spacing={3} sx={{ marginTop: 1 }}>
              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.first_name")}</FormLabel>
                  <TextField
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="Alec"
                    {...register("firstName")}
                    error={errors && errors?.firstName?.message ? true : false}
                    helperText={errors && errors?.firstName?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.last_name")}</FormLabel>
                  <TextField
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="Thompson"
                    {...register("lastName")}
                    error={errors && errors?.lastName?.message ? true : false}
                    helperText={errors && errors?.lastName?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.gender")}</FormLabel>
                  <Select
                    {...register("gender")}
                    labelId="im"
                    id="im"
                    value={watch("gender")}
                    input={<OutlinedInput size="small" fullWidth />}
                    MenuProps={MenuProps}
                  >
                    {im.map((gender) => (
                      <MenuItem key={gender.id} value={gender.id}>
                        {gender.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.birth_day")}</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      {...register("birthDate")}
                      inputFormat="MM/dd/yyyy"
                      value={birthDate}
                      onChange={handleChangeBirthDate}
                      renderInput={(params) => (
                        <TextField size="small" {...params} fullWidth {...register("birthDate")} />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.email")}</FormLabel>
                  <TextField
                    {...register("email")}
                    type="email"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="example@gmail.com"
                    error={errors && errors?.email?.message ? true : false}
                    helperText={errors && errors?.email?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.confirm_email")}</FormLabel>
                  <TextField
                    {...register("confirmEmail")}
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="example@email.com"
                    type="email"
                    error={errors && errors?.confirmEmail?.message ? true : false}
                    helperText={errors && errors?.confirmEmail?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.location")}</FormLabel>
                  <TextField
                    {...register("location")}
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="Sydney, A"
                    error={errors && errors?.location?.message ? true : false}
                    helperText={errors && errors?.location?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.phone")}</FormLabel>
                  <TextField
                    {...register("phoneNumber")}
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="+40 735 631 620"
                    type="number"
                    error={errors && errors?.phoneNumber?.message ? true : false}
                    helperText={errors && errors?.phoneNumber?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.language")}</FormLabel>
                  <TextField
                    {...register("language")}
                    size="small"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                    placeholder="English"
                    error={errors && errors?.language?.message ? true : false}
                    helperText={errors && errors?.language?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <FormLabel>{t("account_setting.skill")}</FormLabel>
                  <Autocomplete
                    multiple
                    id="skill-mutiple"
                    options={[]}
                    value={skill}
                    freeSolo
                    fullWidth
                    onChange={(e,v:any)=>setSkill([...v])}
                    renderTags={(
                      value: any[],
                      getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes
                    ) =>
                      value?.map((option: any, index: any) => {
                        return (
                          <Chip
                            key={index}
                            variant="outlined"
                            label={option}
                            size="small"
                            {...getTagProps({ index })}
                          />
                        );
                      })
                    }
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        error={errors && errors.skill ? true : false}
                        helperText={errors && errors.skill ? "Đây là trường hợp bắt buộc !!!" : ""}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paperSpace} sx={{ marginTop: 3 }}>
            <Typography variant="h6">{t("account_setting.change_pw")}</Typography>

            <Grid container spacing={3} sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <Box>
                  <FormLabel>{t("account_setting.current_pw")}</FormLabel>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <OutlinedInput
                      {...register("currentPassword")}
                      fullWidth
                      id="outlined-adornment-current-password"
                      type={showPassword.currentPassword ? "text" : "password"}
                      size="small"
                      placeholder={t("account_setting.current_pw")}
                      error={errors && errors?.currentPassword?.message ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event) => handleClickShowPassword("currentPassword")}
                            edge="end"
                            size="small"
                          >
                            {showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors?.currentPassword?.message && (
                      <FormHelperText error id="accountId-error">
                        {errors?.currentPassword?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <FormLabel>{t("account_setting.new_pw")}</FormLabel>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <OutlinedInput
                      {...register("newPassword")}
                      fullWidth
                      id="outlined-adornment-new-password"
                      type={showPassword.newPassword ? "text" : "password"}
                      size="small"
                      placeholder={t("account_setting.new_pw")}
                      error={errors && errors?.newPassword?.message ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event) => handleClickShowPassword("newPassword")}
                            edge="end"
                            size="small"
                          >
                            {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors?.newPassword?.message && (
                      <FormHelperText error id="accountId-error">
                        {errors?.newPassword?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <FormLabel>{t("account_setting.confirm_pw")}</FormLabel>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <OutlinedInput
                      {...register("confirmPassword")}
                      fullWidth
                      id="outlined-adornment-confirm-password"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      size="small"
                      placeholder={t("account_setting.confirm_pw")}
                      error={errors && errors?.confirmPassword?.message ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event) => handleClickShowPassword("confirmPassword")}
                            edge="end"
                            size="small"
                          >
                            {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors?.confirmPassword?.message && (
                      <FormHelperText error id="accountId-error">
                        {errors?.confirmPassword?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 4 }}>
              <Box sx={{ display: "flex" }}>
                <Box className={classes.buttonSpace}>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    sx={{ fontWeight: 600 }}
                    type="submit"
                  >
                    {t("button.update")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </form>
      ) : <Progress />}
    </Box>
  );
};

export default AccountSettings;
