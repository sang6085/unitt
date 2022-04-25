import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Confirm from "components/Confirm/Confirm";
import { useTranslation } from "react-i18next";
import TableComponent from "components/Table/Table";
import { CommonStyles } from "utils/styles";
import StatusCard from "components/StatusCard/StatusCard";
import { cancelToken } from "api/common";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "pages/EmailManager/EmailStyle";
import { getEmailList } from "services/EmailService";
import { FC, useEffect, useState } from "react";

const EmailList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const styles = CommonStyles();
  const classes = useStyles();
  const [emails, setEmails] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const onSubmit = (data: any) => console.log(data);
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
      name: "action",
      label: t("user_manager.action"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
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
      name: "status",
      label: t("email_manager.status"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {value ? (
                <StatusCard type="active" children={"Success"} />
              ) : (
                <StatusCard type="inactive" children={"Fail"} />
              )}
            </Box>
          );
        },
      },
    },

    {
      name: "sendDate",
      label: t("email_manager.send_date"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Typography className={classes.sendDate}>{value}</Typography>;
        },
      },
    },
    {
      name: "receiveAddress",
      label: t("email_manager.receive_address"),
    },
    {
      name: "subject",
      label: t("email_manager.subject"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Typography className={classes.subject}>{value}</Typography>;
        },
      },
    },
    {
      name: "content",
      label: t("email_manager.content"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Typography className={classes.content}>{value}</Typography>;
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
    serverSide: true,
    search: false,
    viewColumns: true,
    sort: false,
    rowHover: false,
    selectableRows: "none",
    //serverSide: true,
    rowsPerPageOptions: [10, 20, 30],
    onChangePage: (page: number) => {
      setEmails([]);
      setLoading(true);
      setPage(page + 1);
    },

    onChangeRowsPerPage: (pageSize: number) => {
      setEmails([]);
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
    navigate(`/email-manager/edit/${emails[tableMeta.rowIndex].id}`);
  };

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    getEmailList().subscribe((resInfo: any) => {
      if (resInfo.data.success) {
        setEmails(resInfo.data.data);
        setLoading(false);
        setTotal(resInfo.data.totalCount);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    };
  }, [page, pageSize]);

  return (
    <Box>
      <TableComponent
        title={t("user_manager.search_results")}
        data={emails}
        columns={mainColumns}
        options={options}
        filter={true}
        formData={[
          {
            label: t("job_manager.date_start"),
            name: "dateStart",
            type: "date",
          },
          {
            label: t("job_manager.to"),
            name: "dateTo",
            type: "date",
          },
          {
            label: t("job_manager.status"),
            name: "status",
            type: "option",
            options: [
              {
                label: "All",
                value: 0,
              },
              {
                label: "Saved",
                value: 1,
              },
              {
                label: "Sending",
                value: 2,
              },
              {
                label: "Success",
                value: 3,
              },
              {
                label: "Fail",
                value: 4,
              },
              {
                label: "Unknown",
                value: 5,
              },
            ],
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
export default EmailList;
