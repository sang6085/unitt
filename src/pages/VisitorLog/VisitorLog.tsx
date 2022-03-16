import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { downloadVisitorLogs, getVisitorLogs } from "../../services/VisitorLogService";
import TableComponent from "../../components/Table/Table";
// import ViewWeekIcon from "@mui/icons-material/ViewWeek";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import TableRowsIcon from "@mui/icons-material/TableRows";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import MenuComponent from "../../components/Menu/Menu";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import FallBackComponent from "../../components/FallBackComponent/FallBackComponent";
import { errorHandle } from "../../utils/helper";

const VistorLog = () => {
  const { t } = useTranslation();

  const [data, setData] = React.useState<any>([]);
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [total, setTotal] = React.useState<number>();
  const [order, setOrder] = React.useState<{ orderBy: string; isDesc: boolean }>({
    orderBy: "sign_in",
    isDesc: false,
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [columnsOption, setColumnsOption] = React.useState<any>([
    {
      name: "email",
      label: "Email",
      options: {
        sort: true,
      },
      hidden: false,
    },
    {
      name: "signIn",
      label: t("visitorLog.signin"),
      options: {
        sort: true,
      },
      hidden: false,
    },
    {
      name: "contactPersonName",
      label: t("visitorLog.contact_name"),
      options: {
        sort: true,
      },
      hidden: true,
    },

    {
      name: "branchName",
      label: t("visitorLog.branch_name"),
      selector: [{ label: "Tòa nhà HDBank", name: "Tòa nhà HDBank" }],
      options: {
        sort: true,
      },
      hidden: false,
    },
  ]);

  React.useEffect(() => {
    async function getLogs() {
      getVisitorLogs({
        fromDate: "2021-08-01T10:21:14.000Z",
        toDate: new Date(),
        pageIndex: page,
        orderBy: order?.orderBy,
        isDesc: order?.isDesc,
        pageSize: pageSize,
        notYetCheckOut: null,
        branchIds: [1747],
      }).subscribe((response: any) => {
        if (response) {
          setData(response?.data.data ?? []);
          setTotal(response?.data.totalCount);
          setLoading(false);
        }
      });
    }
    getLogs();
  }, [order, page, pageSize]);

  const columns: any = [
    {
      name: "id",
      label: "ID",
      options: {
        sort: true,
      },
    },
    {
      name: "fullName",
      label: t("visitorLog.fullname"),
      options: {
        sort: true,
      },
    },
    {
      name: "phoneNumber",
      label: t("visitorLog.phonenumber"),
      options: {
        sort: true,
      },
    },
  ];

  const options: any = {
    filterType: "checkbox",
    serverSide: true,
    download: false,
    print: false,
    filter: false,
    count: total,
    search: false,
    viewColumns: false,
    rowsPerPageOptions: [10, 20, 30],
    onPageChange: (page: number) => {
      setData([]);
      setLoading(true);
      setPage(page + 1);
    },
    onRowsPerPageChange: (pageSize: number) => {
      setData([]);
      setLoading(true);
      setPageSize(pageSize);
    },
    onColumnSortChange: (changedColumn: string, direction: string) => {
      setData([]);
      setLoading(true);
      setOrder({
        orderBy: changedColumn,
        isDesc: direction === "desc" ? true : false,
      });
    },
    onChangeViewColumn: (name: string) => {
      const index = columnsOption.findIndex((e: any) => e.name === name);
      const newColumnsOption = [
        ...columnsOption.slice(0, index),
        {
          ...columnsOption[index],
          hidden: !columnsOption[index].hidden,
        },
        ...columnsOption.slice(index + 1),
      ];
      setColumnsOption(newColumnsOption);
    },

    handleFilter: (data: any) => {
      console.log(data);
    },

    handleExport: () => {
      downloadVisitorLogs({
        fromDate: "2021-08-01T10:21:14.000Z",
        toDate: new Date(),
        pageIndex: page,
        orderBy: order?.orderBy,
        isDesc: order?.isDesc,
        pageSize: pageSize,
        notYetCheckOut: null,
        branchIds: [1747],
      }).subscribe((response: any) => {
        console.log(response);
        const getContent = response?.headers["content-disposition"].split(";")[1];
        const domFileName = getContent.split("=")[1];
        const filename = domFileName.substring(1, domFileName.length - 1);
        const url = window.URL.createObjectURL(new Blob([response?.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      });
    },

    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      <ErrorBoundary FallbackComponent={FallBackComponent} onError={errorHandle}>
        <TableComponent
          title="Test"
          data={data}
          columns={columns}
          options={options}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default VistorLog;
