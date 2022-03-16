import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Confirm from "../../components/Confirm/Confirm";
import { getAccountListMock } from "../../services/AccountService";
import { useTranslation } from "react-i18next";
import { IUserSearch, User } from "./UserInterface";
import { SubmitHandler } from "react-hook-form";
import TableComponent from "../../components/Table/Table";
import { CommonStyles } from "../../utils/styles";
import StatusCard from "../../components/StatusCard/StatusCard";

const UserList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const styles = CommonStyles();

  const [accounts, setAccounts] = React.useState<User[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = React.useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [loading, setLoading] = React.useState<boolean>(true);

  const onSubmit: SubmitHandler<IUserSearch> = (data) => console.log(data);

  const mainColumns = [
    {
      name: "index",
      label: "#",
    },
    {
      name: "action",
      label: t("user_manager.action"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box sx={{ display: "flex" }}>
              <Tooltip
                title={t("detail.view") as string}
                onClick={() => changeDetailPage(tableMeta)}
              >
                <IconButton size="small">
                  <RemoveRedEyeIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("detail.edit") as string}
                onClick={() => changeEditPage(tableMeta)}
              >
                <IconButton size="small">
                  <DriveFileRenameOutlineIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("detail.delete") as string}
                onClick={() => {
                  setIsOpenConfirm(true);
                }}
              >
                <IconButton size="small">
                  <DeleteIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
    {
      name: "employeeCode",
      label: t("user_manager.employee_code"),
    },
    {
      name: "userName",
      label: t("user_manager.username"),
    },
    {
      name: "fullName",
      label: t("user_manager.full_name"),
    },
    {
      name: "email",
      label: t("user_manager.email"),
    },
    {
      name: "phone",
      label: t("user_manager.phone_number"),
    },
    {
      name: "enabled",
      label: t("menu_manager.status"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {value === "true" ? (
                <StatusCard
                  type="active"
                  children={t("emailTemplates.active")}
                />
              ) : (
                <StatusCard
                  type="inactive"
                  children={t("emailTemplates.inactive")}
                />
              )}
            </Box>
          );
        },
      },
    },
  ];

  const options: any = {
    filterType: "checkbox",
    download: false,
    responsive: "simple",
    print: false,
    filter: false,
    count: total,
    search: false,
    viewColumns: false,
    sort: false,
    rowHover: false,
    selectableRows: "none",
    rowsPerPageOptions: [10, 20, 30],
    onPageChange: (page: number) => {
      setAccounts([]);
      setLoading(true);
      setPage(page + 1);
    },
    onRowsPerPageChange: (pageSize: number) => {
      setAccounts([]);
      setLoading(true);
      setPageSize(pageSize);
    },
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  const changeEditPage = (tableMeta: any) => {
    navigate(`/account/edit/${accounts[tableMeta.rowIndex].id}`);
  };

  const changeCreatePage = () => {
    navigate(`/account/add`);
  };

  const changeDetailPage = (tableMeta: any) => {
    navigate(`/account/view/${accounts[tableMeta.rowIndex].id}`);
  };

  const [isOpenConfirm, setIsOpenConfirm] = React.useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  React.useEffect(() => {
    getAccountListMock().subscribe((resInfo: any) => {
      if (resInfo.data.success) {
        setAccounts(resInfo.data.data);
        setLoading(false);
        setTotal(resInfo.data.totalCount);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="add-btn">
          <Button variant="contained" onClick={changeCreatePage}>
            {t("button.add")}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
          <TableComponent
            title=""
            data={accounts}
            columns={mainColumns}
            options={options}
            filter={true}
            formData={[
              {
                label: t("user_manager.username"),
                name: "username",
              },
              {
                label: t("user_manager.full_name"),
                name: "fullName",
              },
              {
                label: t("user_manager.email"),
                name: "email",
              },
              {
                label: t("user_manager.position"),
                name: "position",
              },
              {
                label: t("user_manager.organization"),
                name: "organization",
              },
              {
                label: t("user_manager.phone_number"),
                name: "phoneNumber",
              },
            ]}
            handleFilter={onSubmit}
          />
        </Box>
      </Grid>
      {isOpenConfirm && (
        <Confirm
          isOpen={isOpenConfirm}
          isConfirm={onChangeConfirm}
          title={t("confirm_delete.are_you_sure")}
          content={t("confirm_delete.warning_delete")}
        />
      )}
    </Grid>
  );
};
export default UserList;
