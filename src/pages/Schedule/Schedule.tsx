import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import TableComponent from "../../components/Table/Table";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getSchedule } from "../../services/ScheduleService";
import UpdateSchedule from "./UpdateSchedule";

const Schedule = () => {
  const [data, setData] = React.useState<any>([]);
  const [idUpdate, setIdUpdate] = React.useState<number>(-1);

  const onCloseUpdate = () => {
    setIdUpdate(-1);
  };

  const onOpenUpdate = (id: number) => {
    setIdUpdate(id);
  };

  React.useEffect(() => {
    getSchedule().then((response) => {
      setData(response);
    });
  }, []);

  const mainColumns = [
    {
      name: "id",
      label: "#",
    },
    {
      name: "name",
      label: "Tên",
    },
    {
      name: "description",
      label: "Mô Tả",
      options: {
        customBodyRender: (value: any, tableData: any) => {
          return <Box>{value ? value : "--"}</Box>;
        },
      },
    },
    {
      name: "status",
      label: "Trạng Thái",
      options: {
        customBodyRender: (value: any, tableData: any) => {
          return <Box>{value ? "Hoạt động" : "Đã dừng"}</Box>;
        },
      },
    },
    {
      name: "cycle",
      label: "Mô Tả Chu Kỳ",
    },
    {
      name: "nextTimeToStart",
      label: "Thời Gian Dự Kiến Chạy Tiếp Theo",
    },
    {
      name: "activeRecently",
      label: "Thời gian chạy gần nhất",
    },
    {
      name: "action",
      label: "Chức năng",
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => onOpenUpdate(data[tableMeta.rowIndex].id)}>
                  <BorderColorIcon fontSize="small" sx={{ color: "#3295f6" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small">
                  <DeleteOutlineIcon fontSize="small" sx={{ color: "#3295f6" }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
  ];

  const options: any = {
    filterType: "checkbox",
    download: false,
    print: false,
    filter: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    expandableRows: false,
  };

  return (
    <Box>
      <TableComponent title="Schedule" data={data} columns={mainColumns} options={options} />
      <UpdateSchedule id={idUpdate} toggleDrawer={onCloseUpdate} />
    </Box>
  );
};

export default Schedule;
