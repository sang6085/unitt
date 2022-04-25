import {
  Box,
  Divider,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useStyles } from "pages/GroupManager/GroupStyles";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { getAllGroupPermission } from "services/GroupPermissionService";
import { useForm } from "react-hook-form";
import TableComponent from "components/Table/Table";
import Progress from "components/Loading/Loading";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { useEffect, useState } from "react";

interface IListUser {
  id: number;
  accountUser: string;
  fullName: string;
  email: string;
}

const GroupDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("");
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    function getData() {
      if (
        location.pathname.slice(1).split("/")[1] ||
        location.pathname.slice(1).split("/")[2]
      ) {
        // console.log(location.pathname.slice(1).split("/")[1]);
        setMode(location.pathname.slice(1).split("/")[1]);
        getAllGroupPermission().subscribe((response: any) => {
          if (response.data.data) {
            // eslint-disable-next-line array-callback-return
            response?.data.data.map((item: any, index: any) => {
              if (
                item.id === Number(location.pathname.slice(1).split("/")[2])
              ) {
                // setDataDetails(item);
                setValue("description", item.description);
                setValue("nameGroup", item.nameGroup);
                setValue("codeGroup", item.codeGroup);
              }
            });
            setLoading(false);
          }
        });
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const listUser: IListUser | [] = [];

  const columns = [
    {
      name: "id",
      label: "#",
    },
    {
      label: t("group_manager.name_account"),
      name: "accountUser",
    },
    {
      label: t("group_manager.fullname"),
      name: "fullname",
    },
    {
      label: t("group_manager.email"),
      name: "email",
    },
  ];

  const options: any = {
    download: false,
    print: false,
    filter: false,
    search: false,
    viewColumns: true,
    pagination: true,
    rowHover: false,
    selectableRows: "none",
    expandableRows: false,
  };

  const renderTitleMode = () => {
    if (mode === "view") {
      return t("group_manager.title_detail");
    } else
      return mode === "edit"
        ? t("group_manager.title_edit")
        : t("group_manager.title_create");
  };
  return (
    <Box>
      {!loading ? (
        <Box>
          {/* Edit group */}

          {/* Collapse edit */}

          <Box>
            <form onSubmit={onSubmit}>
              <Box>
                <Paper className={classes.paper} elevation={0}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{renderTitleMode()}</Typography>
                    <Divider sx={{ mt: 1, mb: 3 }} />
                  </Grid>
                  <Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box mb={2.5}>
                          <FormLabel>{t("group_manager.code_group")}</FormLabel>
                          <TextField
                            size="small"
                            disabled={mode === "view"}
                            {...register("codeGroup")}
                            className={classes.textField}
                            fullWidth
                            variant="outlined"
                          />
                        </Box>

                        <FormLabel>{t("group_manager.name_group")}</FormLabel>
                        <TextField
                          size="small"
                          disabled={mode === "view"}
                          {...register("nameGroup")}
                          className={classes.textField}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel>{t("group_manager.description")}</FormLabel>
                        <TextField
                          size="small"
                          disabled={mode === "view"}
                          className={classes.textField}
                          fullWidth
                          variant="outlined"
                          {...register("description")}
                          multiline
                          minRows={5}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {mode !== "view" ? (
                          <Box className={classes.boxBtn}>
                            <ButtonComponent
                              onClick={() => reset()}
                              type="reset"
                              color="secondary"
                              variant="contained"
                            >
                              {t("button.reset")}
                            </ButtonComponent>
                            <ButtonComponent
                              className={classes.saveBtn}
                              variant="contained"
                              type="submit"
                            >
                              {t("button.save")}
                            </ButtonComponent>
                          </Box>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </form>

            {/* End collapse edit */}

            {mode !== "create" ? (
              <Box mt={2}>
                <TableComponent
                  title={t("group_manager.title_table")}
                  data={listUser}
                  columns={columns}
                  options={options}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : (
        <Progress />
      )}
    </Box>
  );
};

export default GroupDetails;
