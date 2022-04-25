import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useNavigate } from "react-router-dom";
import Confirm from "components/Confirm/Confirm";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useTranslation } from "react-i18next";
import BoltIcon from "@mui/icons-material/Bolt";
import TableComponent from "components/Table/Table";
import { CommonStyles } from "utils/styles";
import StatusCard from "components/StatusCard/StatusCard";
import { cancelToken } from "api/common";
import { getJobList } from "services/LogService";
import { useState, useEffect, FC } from "react";

const JobList: FC = () => {
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
  const [status, setStatus] = useState<any>([]);

  const handleStatus = (index: number) => {
    let temp_state = [...status];
    temp_state[index] = !status[index];
    setStatus(temp_state);
  };

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
              <Tooltip
                title={t("detail.edit") as string}
                onClick={() => changeEditPage(tableMeta)}
              >
                <IconButton size="small">
                  <DriveFileRenameOutlineIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("job_manager.run") as string}>
                <IconButton size="small">
                  <BoltIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  status[tableMeta.rowIndex]
                    ? (t("job_manager.pause") as string)
                    : (t("job_manager.run") as string)
                }
                onClick={() => {
                  setIsOpenConfirm(true);
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleStatus(tableMeta.rowIndex)}
                >
                  {status[tableMeta.rowIndex] ? (
                    <PauseCircleOutlineIcon className={styles.actionIcons} />
                  ) : (
                    <PlayCircleOutlineIcon className={styles.actionIcons} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: t("job_manager.name"),
    },
    {
      name: "status",
      label: t("menu_manager.status"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {value ? (
                <StatusCard type="active" children={t("job_manager.running")} />
              ) : (
                <StatusCard type="inactive" children={t("job_manager.paused")} />
              )}
            </Box>
          );
        },
      },
    },

    {
      name: "cronExpression",
      label: t("job_manager.cron_expression"),
    },
    {
      name: "nextFireTime",
      label: t("job_manager.next_fire_time"),
    },
    {
      name: "previousFireTime",
      label: t("job_manager.previous_fire_time"),
    },
    {
      name: "description",
      label: t("job_manager.description"),
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
    navigate(`/job-manager/edit/${emails[tableMeta.rowIndex].id}`);
  };

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    getJobList().subscribe((resInfo: any) => {
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
                label: "Paused",
                value: 0,
              },
              {
                label: "Running",
                value: 1,
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
export default JobList;
