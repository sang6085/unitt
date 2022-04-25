import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  Tab,
  FormControl,
  TextField,
  Autocomplete,
  ListItemIcon,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useTranslation } from "react-i18next";
import {
  searchEmployee,
  getFunction,
  getGroupByCompanyId,
  getMemberById,
  deleteMember,
  insertMember,
} from "services/PermissionService";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "contexts/ThemeContext";
import {
  useState,
  useEffect,
  Fragment,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import { useStyles } from "pages/Role/RoleStyle";

const vertical = "top";
const horizontal = "right";
const Role = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const themeContext = useTheme();
  const [refreshEdit, setRefreshEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [idPermission, setIdPermission] = useState<number>(1001);
  const [indexPermission, setIndexPermission] = useState<number>(0);
  const [valueTab, setValueTab] = useState("1");
  const [group, setGroup] = useState<
    {
      permissionId: number;
      permissionName: string;
      totalPermissionCount: number;
    }[]
  >([]);
  const [functionFeatures, setFunctionFeatures] = useState<any>([]);
  const [membersList, setMembersList] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    getGroupByCompanyId().subscribe((response: any) => {
      setGroup(handleSortArray(response.data.data));
    });
    getFunction(idPermission).subscribe((response: any) => {
      setFunctionFeatures(response.data.data);
    });
    getMemberById(idPermission).subscribe((response: any) => {
      if (response.data) {
        setMembers(JSON.parse(response.data.data.members));
      } else {
        setMembers([]);
      }
    });
  }, [idPermission, refreshEdit]);

  useEffect(() => {
    searchEmployee({
      keyword: searchText,
      pageIndex: 1,
      pageSize: 10,
    }).subscribe((response: any) => {
      setMembersList(response.data.data);
    });
  }, [searchText]);

  const handleShowAlert = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleCloseAlert = (
    event: SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSortArray = (array: any) => {
    return array.sort((a: any, b: any) => {
      return a.permissionId - b.permissionId;
    });
  };

  const handleChangePermission = (id: number, index: number) => {
    setIdPermission(id);
    setIndexPermission(index);
    setSearchText("");
  };

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value as string);
  };

  const handleAddMember = (value: any) => {
    if (value) {
      insertMember({
        memberId: value.id,
        permissionId: idPermission,
      }).subscribe((response: any) => {
        if (response.data.success) {
          setRefreshEdit(!refreshEdit);
          handleShowAlert("Inserted a member successfully!");
        }
      });
    }
  };

  const handleDelMember = (memberId: number) => {
    deleteMember({
      memberId: memberId,
      permissionId: idPermission,
    }).subscribe((response: any) => {
      if (response.data.success) {
        setRefreshEdit(!refreshEdit);
        handleShowAlert("Deleted a member successfully!");
      }
    });
  };

  const renderPermissionItem = (permissionItem: string) => {
    if (permissionItem === "C") {
      return "Create";
    } else if (permissionItem === "R") {
      return "View";
    } else if (permissionItem === "U") {
      return "Edit";
    } else {
      return "Delete";
    }
  };

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xl={3} lg={4} xs={8}>
            <Paper className={classes.boxLeft}>
              <Typography
                component="h1"
                variant="h6"
                className={classes.titleLeft}
              >
                Permissions
              </Typography>
              <MenuList dense>
                {group.map((item, index) => (
                  <MenuItem
                    key={item.permissionId}
                    sx={{
                      mb: 1,
                      color:
                        item.permissionId === idPermission
                          ? themeContext.colorTheme
                          : "none",
                    }}
                    onClick={() =>
                      handleChangePermission(item.permissionId, index)
                    }
                  >
                    <ListItemText>{item.permissionName}</ListItemText>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        color:
                          item.permissionId === idPermission
                            ? themeContext.colorTheme
                            : "none",
                      }}
                    >
                      {item.totalPermissionCount}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xl={9} lg={8} xs={8}>
            <Paper className={classes.boxRight}>
              <Box
                className={classes.itemsCenter}
              >
                <BeenhereIcon className={classes.BeenhereIcon} />
                <Typography component="h1" variant="h6">
                  {group && group[indexPermission]?.permissionName}
                </Typography>
              </Box>
              <Box>
                <TabContext value={valueTab}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Roles" value="1" />
                      <Tab label="Members" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel
                    value="1"
                  >
                    <Typography component="h1" variant="h6">
                      Features
                    </Typography>
                    {functionFeatures.map((item: any, index: number) => (
                      <Box
                        key={index}
                        className={classes.itemsCenter}
                      >
                        <Typography
                          component="span"
                          className={classes.txtPermission}
                        >
                          {item.functionName
                            ? t(`function.${item.functionName.toLowerCase()}`)
                            : null}
                        </Typography>
                        {item.id !== 0 ? (
                          <Typography
                            component="span"
                            className={classes.titleMode}
                          >
                            {item.permission
                              .split(",")
                              .map((permissionItem: string, index: number) => (
                                <Fragment key={index}>
                                  {renderPermissionItem(permissionItem)}

                                  {item.permission.split(",").length !==
                                    index + 1 && ", "}
                                </Fragment>
                              ))}
                          </Typography>
                        ) : null}
                      </Box>
                    ))}
                  </TabPanel>
                  <TabPanel value="2">
                    <FormControl fullWidth>
                      <Autocomplete
                        id="member-select"
                        fullWidth
                        options={membersList ?? []}
                        autoHighlight
                        getOptionLabel={(option: any) =>
                          option?.name + " -- " + option?.email
                        }
                        onChange={(event: any, newValue: string | null) =>
                          handleAddMember(newValue)
                        }
                        renderOption={(props, option: any) => (
                          <Box component="li" {...props}>
                            {option?.name + " -- " + option?.email}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <Box component="form" autoComplete="off">
                            <TextField
                              {...params}
                              value={searchText}
                              onChange={handleOnChangeSearch}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "off", // disable autocomplete and autofill
                              }}
                            />
                          </Box>
                        )}
                      />
                    </FormControl>
                    <Typography component="h3">
                      {members.length} result(s):
                    </Typography>
                    <MenuList sx={{ px: 2 }}>
                      {members.map((item: any, index: number) => (
                        <MenuItem key={index}>
                          <ListItemIcon>
                            {item.avatar_file_name ? (
                              <img
                                src={item.avatar_file_name}
                                alt=""
                                className={classes.avatar}
                              />
                            ) : (
                              <AccountBoxIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText>{item.username}</ListItemText>
                          <ListItemText>{item.email}</ListItemText>
                          <Typography variant="body2" color="text.secondary">
                            <Tooltip
                              title="Delete"
                              arrow
                              onClick={() => handleDelMember(item.id)}
                            >
                              <IconButton aria-label="delete" size="small">
                                <DeleteIcon className={classes.actionIcon} />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </TabPanel>
                </TabContext>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Role;
