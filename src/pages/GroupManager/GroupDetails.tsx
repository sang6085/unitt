import {
  Box,
  Button,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { getAllGroupPermission } from "../../services/GroupPermissionService";
import { SubmitHandler, useForm } from "react-hook-form";
import TableComponent from "../../components/Table/Table";
import Progress from "../../components/Loading/Loading";

interface IPData {
  id: number;
  codeGroup: string;
  nameGroup: string;
  description: string;
}

interface IPListUser {
  id: number;
  accountUser: string;
  fullname: string;
  email: string;
}
const useStyles = makeStyles({
  mainTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  boxHeader: {
    display: "flex",
    alignItems: "center",

    marginBottom: 20,
  },
  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    minWidth: 200,
    fontSize: "14px !important",
    fontWeight: "bold",
  },
  boxBtn: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
});

const GroupDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [mode, setMode] = React.useState<string>("");
  const [dataDetails, setDataDetails] = React.useState<IPData>();

  React.useEffect(() => {
    async function getData() {
      if (location.pathname.slice(1).split("/")[1] || location.pathname.slice(1).split("/")[2]) {
        // console.log(location.pathname.slice(1).split("/")[1]);
        setMode(location.pathname.slice(1).split("/")[1]);
        getAllGroupPermission().subscribe((response: any) => {
          if (response.data.data) {
            // eslint-disable-next-line array-callback-return
            response?.data.data.map((item: any, index: any) => {
              if (item.id === Number(location.pathname.slice(1).split("/")[2])) {
                setDataDetails(item);
              }
            });
            setLoading(false);
          }
        });
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, loading]);

  const { register, handleSubmit } = useForm();
  const onSubmitEdit: SubmitHandler<IPData> = (data) => {
    console.log(data);
  };

  const onSubmitCreate: SubmitHandler<IPData> = (data) => {
    console.log(data);
  };
  const listUser: IPListUser | [] = [];

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
    viewColumns: false,
    pagination: true,
    rowHover: false,
    selectableRows: "none",
    expandableRows: false,
  };
  return (
    <Box sx={{ height: "100vh" }}>
      {!loading ? (
        <Box>
          {mode === "view" ? (
            <Box>
              {/* View Group */}

              <Box>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ px: 3, mb: 1 }}>
                    <Grid container spacing={5}>
                      <Grid item xs={6}>
                        <Box sx={{ mb: 2 }}>
                          <FormLabel>{t("group_manager.code_group")}</FormLabel>
                          <TextField
                            sx={{ mt: 0.5 }}
                            size="small"
                            disabled
                            fullWidth
                            defaultValue={dataDetails?.codeGroup}
                          />
                        </Box>
                        {/* </Grid>
                        <Grid item xs={1}> */}
                        <Box sx={{ mb: 2 }}>
                          <FormLabel>{t("group_manager.name_group")}</FormLabel>
                          <TextField
                            sx={{ mt: 0.5 }}
                            size="small"
                            disabled
                            fullWidth
                            defaultValue={dataDetails?.nameGroup}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ mb: 0 }}>
                          <FormLabel>{t("group_manager.description")}</FormLabel>
                          <TextField
                            multiline
                            minRows={5}
                            sx={{ mt: 0.5 }}
                            size="small"
                            fullWidth
                            disabled
                            defaultValue={dataDetails?.description}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

                <Box sx={{ mt: 2 }}>
                  <TableComponent title="" columns={columns} data={listUser} options={options} />
                </Box>
              </Box>
            </Box>
          ) : mode === "edit" ? (
            <Box>
              {/* Edit group */}

              {/* Collapse edit */}

              <Box>
                <form onSubmit={handleSubmit(onSubmitEdit)}>
                  <Box>
                    <Paper sx={{ p: 3 }}>
                      <Box sx={{ px: 3 }}>
                        <Grid container sx={{ mb: 3 }}>
                          <Grid item xs={6} sx={{ pr: 2 }}>
                            <Box sx={{ mb: 2.5 }}>
                              <FormLabel>{t("group_manager.code_group")}</FormLabel>
                              <TextField
                                size="small"
                                {...register("codeGroup")}
                                sx={{ mt: 0.5 }}
                                fullWidth
                                variant="outlined"
                                defaultValue={dataDetails?.codeGroup}
                              />
                            </Box>

                            <FormLabel>{t("group_manager.name_group")}</FormLabel>
                            <TextField
                              size="small"
                              {...register("nameGroup")}
                              sx={{ mt: 0.5 }}
                              fullWidth
                              variant="outlined"
                              defaultValue={dataDetails?.nameGroup}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ pl: 2 }}>
                            <FormLabel>{t("group_manager.description")}</FormLabel>
                            <TextField
                              size="small"
                              sx={{ mt: 0.5 }}
                              fullWidth
                              variant="outlined"
                              {...register("description")}
                              multiline
                              minRows={5}
                              defaultValue={dataDetails?.description}
                            />
                          </Grid>
                        </Grid>
                        <Box className={classes.boxBtn}>
                          <Button type="reset" variant="outlined">
                            {t("button.reset")}
                          </Button>
                          <Button
                            sx={{
                              ml: 2,
                              textTransform: "none",
                            }}
                            variant="contained"
                            type="submit"
                          >
                            {t("button.save")}
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </form>

                {/* End collapse edit */}

                <Box sx={{ mt: 2 }}>
                  <TableComponent title="" data={listUser} columns={columns} options={options} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              {/* Create group   */}
              <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(onSubmitCreate)}>
                  <Box>
                    <Box sx={{ px: 3 }}>
                      <Box className={classes.box}>
                        <Typography className={classes.title}>
                          {t("group_manager.code_group")}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          {...register("codeGroup")}
                          size="small"
                          fullWidth
                          variant="outlined"
                        />
                      </Box>
                      <Box className={classes.box}>
                        <Typography className={classes.title}>
                          {t("group_manager.name_group")}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          {...register("nameGroup")}
                          size="small"
                          fullWidth
                          variant="outlined"
                        />
                      </Box>
                      <Box className={classes.box}>
                        <Typography className={classes.title}>
                          {t("group_manager.description")}
                        </Typography>
                        <TextField
                          {...register("description")}
                          size="small"
                          fullWidth
                          variant="outlined"
                          multiline
                          minRows={3}
                        />
                      </Box>
                      <Box className={classes.boxBtn}>
                        <Button sx={{ minWidth: 120 }} color="inherit" variant="contained">
                          {t("button.reset")}
                        </Button>
                        <Button type="submit" sx={{ minWidth: 120, ml: 2 }} variant="contained">
                          {t("group_manager.save_btn")}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </form>
              </Paper>
            </Box>
          )}
        </Box>
      ) : (
        <Progress />
      )}
    </Box>
  );
};

export default GroupDetails;
