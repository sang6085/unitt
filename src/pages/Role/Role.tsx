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
import React from "react";
import { useTranslation } from "react-i18next";
import {
  searchEmployee,
  getFunction,
  getGroupByCompanyId,
  getMemberById,
  deleteMember,
  insertMember,
} from "../../services/PermissionService";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "../../Contexts/ThemeContext";

const vertical = "top";
const horizontal = "right";
const Role = () => {
  const { t } = useTranslation();
  const themeContext = useTheme();
  const [refreshEdit, setRefreshEdit] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const [idPermission, setIdPermission] = React.useState<number>(1001);
  const [indexPermission, setIndexPermission] = React.useState<number>(0);
  const [valueTab, setValueTab] = React.useState("1");
  const [group, setGroup] = React.useState<
    {
      permissionId: number;
      permissionName: string;
      totalPermissionCount: number;
    }[]
  >([]);
  const [functionFetures, setFunctionFetures] = React.useState<any>([]);
  const [membersList, setMembersList] = React.useState<any>([]);
  const [members, setMembers] = React.useState<any>([]);
  const [searchText, setSearchText] = React.useState<string>("");

  React.useEffect(() => {
    getGroupByCompanyId().subscribe((response: any) => {
      setGroup(handleSortArray(response.data.data));
    });
    getFunction(idPermission).subscribe((response: any) => {
      setFunctionFetures(response.data.data);
    });
    getMemberById(idPermission).subscribe((response: any) => {
if (response.data) {
        setMembers(JSON.parse(response.data.data.members));
      } else {
        setMembers([]);
      }
    });
  }, [idPermission, refreshEdit]);

  React.useEffect(() => {
    searchEmployee({ keyword: searchText, pageIndex: 1, pageSize: 10 }).subscribe((response: any) => {
      setMembersList(response.data.data);
    });
  }, [searchText]);

  const handleShowAlert = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleCloseAlert = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        handleShowAlert("Deleled a member successfully!");
      }
    });
  };

  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {t("menu.roles_management")}
        </Typography>
      </Box>
      <Box className="content">
        <Grid container spacing={2} sx={{ minWidth: 1100 }}>
          <Grid item xl={3} lg={4} xs={8}>
            <Paper sx={{ p: 3, minWidth: 250, height: "100%" }}>
              <Typography component="h1" variant="h6" sx={{ ml: "15px", mb: 1 }}>
                Permissions
              </Typography>
              <MenuList dense>
                {group.map((item, index) => (
                  <MenuItem
                    key={item.permissionId}
                    sx={{
                      mb: 1,
                      color: item.permissionId === idPermission ? themeContext.colorTheme : "none",
                    }}
                    onClick={() => handleChangePermission(item.permissionId, index)}
                  >
                    <ListItemText>{item.permissionName}</ListItemText>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        color:
                          item.permissionId === idPermission ? themeContext.colorTheme : "none",
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
            <Paper sx={{ p: 3, minWidth: 600, height: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <BeenhereIcon sx={{ fontSize: 28, mr: 1, color: "#2196f3" }} />
                <Typography component="h1" variant="h6">
                  {group && group[indexPermission]?.permissionName}
                </Typography>
              </Box>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={valueTab}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      <Tab label="Roles" value="1" />
                      <Tab label="Members" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
                      Features
                    </Typography>
                    {functionFetures.map((item: any, index: number) => (
                      <Box
                        key={index}
                        sx={{ mb: 1, display: "flex", flexDirection: "row", alignItems: "center" }}
                      >
                        <Typography component="span" sx={{ fontSize: 15, fontWeight: 700, mr: 2 }}>
                          {item.functionName
                            ? t(`function.${item.functionName.toLowerCase()}`)
                            : null}
                        </Typography>
                        {item.id !== 0 ? (
                          <Typography component="span" sx={{ fontSize: 15, color: "#9e9e9e" }}>
                            {item.permission
                              .split(",")
                              .map((permissionItem: string, index: number) => (
                                <React.Fragment key={index}>
                                  {permissionItem === "C"
                                    ? "Create"
                                    : permissionItem === "R"
                                    ? "View"
                                    : permissionItem === "U"
                                    ? "Edit"
                                    : "Delete"}
                                  {item.permission.split(",").length !== index + 1 && ", "}
                                </React.Fragment>
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
                        getOptionLabel={(option: any) => option?.name + " -- " + option?.email}
                        onChange={(event: any, newValue: string | null) =>
                          handleAddMember(newValue)
                        }
                        renderOption={(props, option: any) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
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
                    <Typography component="h3" sx={{ mx: 2, fontSize: 14, mt: 1 }}>
                      {members.length} result(s):
                    </Typography>
                    <MenuList sx={{ px: 2 }}>
                      {members.map((item: any, index: number) => (
                        <MenuItem key={index} sx={{ pl: 0, pr: 1 }}>
                          <ListItemIcon>
                            {item.avatar_file_name ? (
                              <img
                                src={item.avatar_file_name}
                                alt=""
                                style={{ width: 40, height: 40, marginRight: 8, borderRadius: 8 }}
                              />
                            ) : (
                              <AccountBoxIcon sx={{ fontSize: 40, mr: 1 }} />
                            )}
                          </ListItemIcon>
                          <ListItemText>{item.username}</ListItemText>
                          <ListItemText>{item.email}</ListItemText>
                          <Typography variant="body2" color="text.secondary">
                            <Tooltip title="Delete" arrow onClick={() => handleDelMember(item.id)}>
                              <IconButton aria-label="delete" size="small">
                                <DeleteIcon sx={{ color: "#ff0000b8", fontSize: 22 }} />
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
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Role;
