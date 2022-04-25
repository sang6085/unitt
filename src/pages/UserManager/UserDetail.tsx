/* eslint-disable jsx-a11y/alt-text */
import {
  Autocomplete,
  Box,
  Checkbox,
  FormLabel,
  Grid,
  IconButton,
  Switch,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useLocation, useParams } from "react-router-dom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf } from "yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Confirm from "components/Confirm/Confirm";
import { MUIDataTableOptions } from "mui-datatables";
import { IInfo } from "pages/UserManager/UserInterface";
import TableComponent from "components/Table/Table";
import { useStyle } from "pages/UserManager/UserStyle";
import Progress from "components/Loading/Loading";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { getAccountById } from "services/AccountService";
import { useState, useEffect } from "react";

const label = { inputProps: { "aria-label": "Switch demo" } };

const genders = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const UserDetail = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const location = useLocation();
  const [files, setFiles] = useState<any>([]);
  const [birthday, setBirthday] = useState<Date | null>();
  const [group, setGroup] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [indexOrgForAccount, setIndexOrgForAccount] = useState<number>(0);
  const [accountVal, setAccountVal] = useState<any>([]);
  const navigate = useNavigate();
  const { userId } = useParams();
  const type: string = location.pathname.split("/")[2];
  const schema: SchemaOf<IInfo> = yup.object().shape({
    employeeCode: yup.string().required(t("error.field_required")),
    userName: yup.string().required(t("error.field_required")),
    password: yup.string().required(t("error.field_required")),
    birthday: yup.string().required(t("error.field_required")),
    fullName: yup.string().required(t("error.field_required")),
    email: yup
      .string()
      .email("Invalid email address")
      .required(t("error.field_required")),
    group: yup.array(),
    phone: yup.string().required(t("error.field_required")),
    gender: yup.string().required(t("error.field_required")),
    locked: yup.bool().required(t("error.field_required")),
    enabled: yup.bool().required(t("error.field_required")),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IInfo>({
    defaultValues: {
      employeeCode: "",
      userName: "",
      fullName: "",
      password: "",
      birthday: "",
      gender: "male",
      email: "",
      phone: "",
      locked: false,
      enabled: false,
      group: [],
    },
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const [groups] = useState<any>([
    { id: "userName", name: "Tên đăng nhập" },
    { id: "fullName", name: "Họ tên" },
    { id: "email", name: "Email" },
    { id: "positionName", name: "Chức danh" },
    { id: "orgName", name: "Tổ chức" },
    { id: "phone", name: "Số điện thoại" },
  ]);

  const [orgForAccount, setOrgForAccount] = useState<any>([
    {
      index: 1,
      id: 1,
      organizationName: "InsuranceSales",
      positionDisplay: "insurance_sales",
      positionSystem: "Insurance Sales",
      orgMain: false,
      active: false,
    },
  ]);

  const mainColumns = [
    {
      name: "index",
      label: "#",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Typography>{tableMeta.rowIndex + 1}</Typography>;
        },
      },
    },

    {
      name: "Organization name",
      label: t("user_manager.organization_name"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Autocomplete
              size="small"
              options={groups}
              fullWidth
              disabled={type === "view"}
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
            />
          );
        },
      },
    },
    {
      name: "positionDisplay",
      label: t("user_manager.position_display"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Autocomplete
              size="small"
              options={groups}
              fullWidth
              disabled={type === "view"}
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
            />
          );
        },
      },
    },
    {
      name: "positionSystem",
      label: t("user_manager.position_system"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Autocomplete
              size="small"
              options={groups}
              fullWidth
              disabled={type === "view"}
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
            />
          );
        },
      },
    },
    {
      name: "orgMain",
      label: t("user_manager.org_main"),
      options: {
        customBodyRender: (value: boolean, tableMeta: any) => {
          return <Checkbox defaultChecked={value} disabled={type === "view"} />;
        },
      },
    },
    {
      name: "active",
      label: t("user_manager.active"),
      options: {
        customBodyRender: (value: boolean, tableMeta: any) => {
          return <Checkbox defaultChecked={value} disabled={type === "view"} />;
        },
      },
    },
    {
      name: "action",
      label: t("user_manager.action"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <IconButton
              size="small"
              disabled={type === "view"}
              onClick={() => {
                setIsOpenConfirm(true);
                setIndexOrgForAccount(tableMeta.rowIndex);
              }}
              className={classes.icon}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    download: false,
    print: false,
    filter: false,
    sort: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    responsive: "standard",
    pagination: false,
    rowHover: false,
    customToolbar: () => (
      <>
        {type !== "view" &&
          (orgForAccount.length === 2 ? (
            <IconButton
              onClick={() => handleAddOrgForAccount(false)}
              size="small"
            >
              <KeyboardBackspaceIcon className={classes.icon} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleAddOrgForAccount(true)}
              size="small"
            >
              <AddCircleIcon className={classes.icon} />
            </IconButton>
          ))}
        {type !== "view" && (
          <IconButton size="small">
            <SaveIcon className={classes.icon} />
          </IconButton>
        )}
      </>
    ),
  };

  const handleAddOrgForAccount = (value: boolean) => {
    if (value) {
      let newOrgForAccount = [...orgForAccount];
      newOrgForAccount.push({
        index: newOrgForAccount.length + 1,
        id: newOrgForAccount.length + 1,
        organizationName: "InsuranceSales",
        positionDisplay: "insurance_sales",
        positionSystem: "Insurance Sales",
        orgMain: true,
        active: true,
      });
      setOrgForAccount(newOrgForAccount);
    } else {
      let newOrgForAccount = [...orgForAccount];
      newOrgForAccount.splice(newOrgForAccount.length - 1, 1);
      setOrgForAccount(newOrgForAccount);
    }
  };

  const handleDelOrgForAccount = (rowIndex: number) => {
    let newOrgForAccount = [...orgForAccount];
    newOrgForAccount.splice(rowIndex, 1);
    console.log(rowIndex);
    console.log(newOrgForAccount);

    setOrgForAccount(newOrgForAccount);
    setIsOpenConfirm(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleChangeBirthday = (newValue: Date | null) => {
    setBirthday(newValue);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles: any) => {
      setFiles(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      setAccountVal({ avatar: true });
    },
  });

  const isConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
    if (value) {
      handleDelOrgForAccount(indexOrgForAccount);
    }
  };

  useEffect(() => {
    if (type !== "add") {
      getAccountById(Number(userId)).subscribe((resInfo: any) => {
        if (resInfo.data.success) {
          setAccountVal(resInfo.data.data);
          setOrgForAccount(resInfo.data.data.orgforAccount);
          setValue("employeeCode", resInfo.data.data.employeeCode);
          setValue("userName", resInfo.data.data.userName);
          setValue("fullName", resInfo.data.data.fullName);
          setValue("birthday", resInfo.data.data.birthday);
          setValue("email", resInfo.data.data.email);
          setValue("phone", resInfo.data.data.phone);
          setValue("password", resInfo.data.data.password);
          setValue("gender", resInfo.data.data.gender);
          setValue("enabled", resInfo.data.data.enabled);
          setValue("locked", resInfo.data.data.locked);
          setGroup([{ id: 'positionName', name: 'Chức danh' }]);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Progress />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h6">Detail</Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className={classes.contentForm}>
              <Grid item xs={12} md={4}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sx={{ textAlign: "end", pr: 1 }}>
                    <FormControlLabel
                      control={
                        <Controller
                          control={control}
                          name="locked"
                          defaultValue={watch("locked")}
                          render={({ field: { onChange } }) => (
                            <Switch
                              {...label}
                              disabled={type === "view"}
                              onChange={(e) => onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      labelPlacement="start"
                      label={
                        watch("locked")
                          ? (t("user_manager.enabled") as string)
                          : (t("user_manager.locked") as string)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box className={classes.itemCenter}>
                      <Box className={classes.borderAvatar}>
                        <ButtonComponent
                          className={classes.buttonUpload}
                          onClick={() => {
                            open();
                          }}
                          disabled={type === "view"}
                        >
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <img
                              src={
                                files.preview === undefined
                                  ? accountVal.avatar
                                  : files.preview
                              }
                              className={
                                accountVal.avatar === undefined
                                  ? classes.noneImg
                                  : classes.img
                              }
                            />
                          </div>
                          <Box className={classes.hvBtnUpload}>
                            <PhotoCameraIcon />
                            <Typography variant="caption">
                              {t("user_manager.upload")}
                            </Typography>
                          </Box>
                        </ButtonComponent>
                      </Box>
                    </Box>

                    <Typography component="p" style={{ textAlign: "center" }}>
                      {t("user_manager.allowed")} *.jpeg, *.jpg, *.png, *.gif
                    </Typography>
                    <Typography component="p" style={{ textAlign: "center" }}>
                      {t("user_manager.max_size_of")} 3.1MB
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={9}>
                        <Typography
                          gutterBottom
                          className={classes.fontWeight500}
                        >
                          {t("user_manager.receive_notification")}
                        </Typography>
                        <Typography variant="body2">
                          Disable this will automatically send the user a
                          notification
                        </Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.itemEnd}>
                        <Switch {...label} disabled={type === "view"} />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          gutterBottom
                          className={classes.fontWeight500}
                        >
                          {t("user_manager.receive_email")}
                        </Typography>
                        <Typography variant="body2">
                          Disable this will automatically send the user a email
                        </Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.itemEnd}>
                        <Switch {...label} disabled={type === "view"} />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          gutterBottom
                          className={classes.fontWeight500}
                        >
                          {t("user_manager.carry_over")}
                        </Typography>
                        <Typography variant="body2">
                          Apply disable account
                        </Typography>
                      </Grid>
                      <Grid item xs={3} className={classes.itemEnd}>
                        <Switch {...label} disabled={type === "view"} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.employee_code")}</FormLabel>

                    <TextField
                      {...register("employeeCode")}
                      name="employeeCode"
                      type="text"
                      id="employeeCode"
                      size="small"
                      variant="outlined"
                      disabled={type === "view"}
                      fullWidth
                      error={errors.employeeCode ? true : false}
                      helperText={errors.employeeCode?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.username")}</FormLabel>

                    <TextField
                      {...register("userName")}
                      name="userName"
                      type="text"
                      id="userName"
                      size="small"
                      variant="outlined"
                      disabled={type === "view"}
                      fullWidth
                      error={errors.userName ? true : false}
                      helperText={errors.userName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.full_name")}</FormLabel>

                    <TextField
                      {...register("fullName")}
                      name="fullName"
                      type="text"
                      id="fullName"
                      disabled={type === "view"}
                      size="small"
                      variant="outlined"
                      fullWidth
                      error={errors.fullName ? true : false}
                      helperText={errors.fullName?.message}
                    />
                  </Grid>
                  {type !== "view" && (
                    <Grid item xs={12} sm={6}>
                      <FormLabel>{t("user_manager.password")}</FormLabel>

                      <TextField
                        {...register("password")}
                        name="password"
                        type="password"
                        id="password"
                        size="small"
                        variant="outlined"
                        fullWidth
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.birthday")}</FormLabel>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        {...register("birthday")}
                        inputFormat="MM/dd/yyyy"
                        value={birthday}
                        onChange={handleChangeBirthday}
                        disabled={type === "view"}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            fullWidth
                            {...register("birthday")}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.gender")}</FormLabel>

                    <Select
                      {...register("gender")}
                      disabled={type === "view"}
                      value={watch("gender")}
                      input={<OutlinedInput size="small" fullWidth />}
                    >
                      {genders.map((gender) => (
                        <MenuItem key={gender.id} value={gender.id}>
                          {gender.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.email")}</FormLabel>

                    <TextField
                      {...register("email")}
                      name="email"
                      type="text"
                      id="email"
                      size="small"
                      variant="outlined"
                      disabled={type === "view"}
                      fullWidth
                      error={errors.email ? true : false}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>{t("user_manager.phone_number")}</FormLabel>

                    <TextField
                      {...register("phone")}
                      name="phone"
                      type="text"
                      id="phone"
                      disabled={type === "view"}
                      size="small"
                      variant="outlined"
                      fullWidth
                      error={errors.phone ? true : false}
                      helperText={errors.phone?.message}
                    />
                  </Grid>
                  {type !== "view" && (
                    <Grid item xs={12} sm={6}>
                      <FormLabel>{t("user_manager.group")}</FormLabel>
                      {
                        <Autocomplete
                          multiple
                          value={group}
                          onChange={(event, newValue) => {
                            setGroup(newValue);
                            setValue("group", newValue);
                          }}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={groups}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option?.name}
                          renderOption={(props, option, { selected }) => {
                            return (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.name}
                              </li>
                            );
                          }}
                          fullWidth
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      }
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.itemBtnRight}>
                <ButtonComponent
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {t("user_manager.cancel")}
                </ButtonComponent>
                {type !== "view" && (
                  <ButtonComponent
                    variant="contained"
                    className={classes.spacingBtn}
                    type="submit"
                  >
                    {t("user_manager.save")}
                  </ButtonComponent>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      {type !== "add" && (
        <Grid item xs={12}>
          <TableComponent
            title={t("user_manager.organization_for_account")}
            data={orgForAccount}
            columns={mainColumns}
            options={options}
            filter={false}
          />

          {isOpenConfirm && (
            <Confirm
              isOpen={isOpenConfirm}
              isConfirm={isConfirm}
              title={t("confirm_delete.are_you_sure")}
              content={t("confirm_delete.warning_delete")}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};
export default UserDetail;
