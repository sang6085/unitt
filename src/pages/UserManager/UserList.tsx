import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Confirm from "components/Confirm/Confirm";
import { useTranslation } from "react-i18next";
import { IUserSearch, User } from "./UserInterface";
import { SubmitHandler } from "react-hook-form";
import TableComponent from "components/Table/Table";
import { CommonStyles } from "utils/styles";
import StatusCard from "components/StatusCard/StatusCard";
import { cancelToken } from "api/common";
import Button from "components/Button/Button";
import { getAccountList } from "services/AccountService";
import { useState, useEffect, FC } from "react";

const UserList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const styles = CommonStyles();

  const [accounts, setAccounts] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

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
    responsive: "standard",
    print: false,
    filter: false,
    count: total,
    serverSide:true,
    search: false,
    viewColumns: true,
    sort: false,
    selectableRows: "none",
    rowsPerPageOptions: [10, 20, 30],
    onChangePage: (page: number) => {
      setAccounts([]);
      setLoading(true);
      setPage(page + 1);
    },
    onChangeRowsPerPage: (pageSize: number) => {
      setAccounts([]);
      setLoading(true);
      setPageSize(pageSize);
      console.log(pageSize);
      
      
    },
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  const changeEditPage = (tableMeta: any) => {
    navigate(`/user-manager/edit/${accounts[tableMeta.rowIndex].id}`);
  };

  const changeCreatePage = () => {
    navigate(`/user-manager/add`);
  };

  const changeDetailPage = (tableMeta: any) => {
    navigate(`/user-manager/view/${accounts[tableMeta.rowIndex].id}`);
  };

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    getAccountList().subscribe((resInfo: any) => {
      if (resInfo.data.success) {
        setAccounts(resInfo.data.data);
        setLoading(false);
        setTotal(resInfo.data.totalCount);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken()
    }
  }, [page, pageSize]);

  return (
    <Box>
      <Box className="add-btn">
        <Button variant="contained" onClick={changeCreatePage}>
          {t("button.add")}
        </Button>
      </Box>
      <TableComponent
        title={t("user_manager.search_results")}
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
      {isOpenConfirm && (
        <Confirm
          isOpen={isOpenConfirm}
          isConfirm={onChangeConfirm}
          title={t("confirm_delete.are_you_sure")}
          content={t("confirm_delete.warning_delete")}
        />
      )}
    </Box>
  );
};
export default UserList;
