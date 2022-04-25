import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Confirm from "components/Confirm/Confirm";
import { useTranslation } from "react-i18next";
import BoltIcon from "@mui/icons-material/Bolt";
import TableComponent from "components/Table/Table";
import { CommonStyles } from "utils/styles";
import StatusCard from "components/StatusCard/StatusCard";
import { cancelToken } from "api/common";
import { getJobLogsList } from "services/JobLogsService";
import { useState, useEffect, FC } from "react";

const JobLogsList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const styles = CommonStyles();

  const [emails, setEmails] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  // const onSubmit: SubmitHandler<IUserSearch> = (data) => console.log(data);
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
            <Box sx={{ display: "flex" }}>
              <Tooltip title={t("job_logs_manager.run") as string}>
                <IconButton size="small">
                  <BoltIcon className={styles.actionIcons} />
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
      name: "jobName",
      label: t("job_logs_manager.job_name"),
    },
    {
      name: "scheduleName",
      label: t("job_logs_manager.schedule_name"),
    },
    {
      name: "status",
      label: t("job_logs_manager.status"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              <StatusCard type="active" children={value} />
            </Box>
          );
        },
      },
    },
    {
      name: "dateCreate",
      label: t("job_logs_manager.date_create"),
    },
    {
      name: "dateStart",
      label: t("job_logs_manager.date_start"),
    },
    {
      name: "description",
      label: t("job_logs_manager.description"),
    },
    {
      name: "error",
      label: t("job_logs_manager.error"),
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

  const changeCreatePage = () => {
    navigate(`/jobLogs/add`);
  };

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    getJobLogsList().subscribe((resInfo: any) => {
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
      <Box className="add-btn">
        <Button variant="contained" onClick={changeCreatePage}>
          {t("button.add")}
        </Button>
      </Box>
      <TableComponent
        title={t("user_manager.search_results")}
        data={emails}
        columns={mainColumns}
        options={options}
        filter={true}
        formData={[
          {
            label: t("job_logs_manager.date_start"),
            name: "dateStart",
            type: "date",
          },
          {
            label: t("job_logs_manager.to"),
            name: "dateTo",
            type: "date",
          },
          {
            label: t("job_logs_manager.status"),
            name: "status",
            type: "option",
            options: [
              {
                label: "Waiting",
                value: 0,
              },
              {
                label: "Paused",
                value: 1,
              },
              {
                label: "Completed",
                value: 2,
              },
              {
                label: "Running",
                value: 3,
              },
              {
                label: "Error",
                value: 4,
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
export default JobLogsList;
