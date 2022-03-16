import React from "react";
import { Box } from "@mui/system";
import { getEmployee } from "../../services/EmployeeService";
import {
  // Alert,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/images/default_avatar.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import CustomFooterTable from "../../components/CustomFooterTable/CustomFooterTable";

const Employee: React.FC = () => {
  const { t } = useTranslation();
  const [dataEmployee, setDataEmployee] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [total, setTotal] = React.useState<number>();
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [order] = React.useState<{
    isDesc: boolean;
  }>({
    isDesc: false,
  });
  const [keyWord, setKeyWord] = React.useState<string>("");
  const keyWordRef = React.useRef<any>("");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    async function getDataEmployees() {
      getEmployee({
        allDepartment: true,
        allJobTitle: true,
        branchIds: [1003],
        departmentIds: [1234, 1235, 1236, 1237, 1238, 1239],
        isAlphabeticalOrder: true,
        isDesc: order.isDesc,
        jobTitleIds: [1269, 1266, 1267, 1265, 1268, 1270, 1271, 1264],
        keyword: keyWord,
        pageIndex: pageNumber,
        pageSize: pageSize,
      }).subscribe((response: any) => {
        if (response) {
          // console.log(response);
          setDataEmployee(response?.data.data);
          setTotal(response?.totalCount);
          setIsLoading(false);
        }
      });
    }
    getDataEmployees();
  }, [isLoading, pageSize, total, pageNumber, order.isDesc, keyWord]);

  const SearchEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyWord(keyWordRef.current?.value as string);
    setIsLoading(true);
  };

  const mainColumns: any = [
    {
      name: "personalInfo",
      label: t(`employee.avt`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box>
              <img
                style={{
                  height: 52,
                  width: 52,
                  borderRadius: 40,
                }}
                src={
                  tableIndex?.tableData[tableIndex.rowIndex][1].avatarFileName === null ||
                  tableIndex?.tableData[tableIndex.rowIndex][1].avatarFileName === ""
                    ? avatar
                    : tableIndex?.tableData[tableIndex.rowIndex][1].avatarFileName
                }
                alt="avatar"
              />
            </Box>
          );
        },
      },
    },
    {
      name: "personalInfo",
      label: t(`employee.name`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return <Box>{tableIndex?.tableData[tableIndex.rowIndex][1].fullName}</Box>;
        },
      },
    },
    {
      name: "personalInfo",
      label: t(`employee.email`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return <Box>{tableIndex?.tableData[tableIndex.rowIndex][1].email}</Box>;
        },
      },
    },
    {
      name: "personalInfo",
      label: t(`employee.phone`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return <Box>{tableIndex?.tableData[tableIndex.rowIndex][1].phone}</Box>;
        },
      },
    },
    {
      name: "jobInfo",
      label: t(`employee.jobtitle`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return <Box>{tableIndex?.tableData[tableIndex.rowIndex][4]?.jobtitleName}</Box>;
        },
      },
    },
    {
      name: "jobInfo",
      label: t(`employee.department`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return <Box>{tableIndex?.tableData[tableIndex.rowIndex][4]?.departmentName}</Box>;
        },
      },
    },
    {
      name: "jobInfo",
      label: t(`employee.site`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  background: "lightBlue",
                  width: 10,
                  height: 10,
                  borderRadius: 40,
                  mr: 2,
                }}
              ></Box>
              {tableIndex?.tableData[tableIndex.rowIndex][4]?.office === null ? (
                <Box>Office</Box>
              ) : (
                <Box>{tableIndex?.tableData[tableIndex.rowIndex][4]?.office[0]?.name}</Box>
              )}
            </Box>
          );
        },
      },
    },
    {
      name: "",
      label: t(`employee.actions`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Tooltip title="edit" arrow>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete" arrow>
                <IconButton onClick={() => setOpen(!open)}>
                  <DeleteForeverIcon sx={{ color: "red" }} />
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
    serverSide: true,
    download: false,
    print: false,
    filter: false,
    count: total,
    search: false,
    viewColumns: false,
    rowsPerPageOptions: [5, 10, 15],
    onChangePage: (page: number) => {
      setDataEmployee([]);
      setIsLoading(true);
      setPageNumber(page + 1);
    },
    onChangeRowsPerPage: (pageSize: number) => {
      setDataEmployee([]);
      setIsLoading(true);
      setPageSize(pageSize);
    },
    // onColumnSortChange: (changedColumn: string, direction: string) => {
    //   setDataEmployee([]);
    //   setIsLoading(true);
    //   setOrder({
    //     isDesc: direction === "desc" ? true : false,
    //   });
    // },
    customFooter: (
      count: any,
      page: any,
      rowsPerPage: any,
      changeRowsPerPage: any,
      changePage: any
    ) => {
      return (
        <Box>
          <CustomFooterTable
            count={count}
            pageSize={pageSize}
            setPageSize={setPageSize}
            rowsPerPageOptions={[5, 10, 15]}
            changePage={changePage}
          />
        </Box>
      );
    },
    textLabels: {
      body: {
        noMatch: isLoading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      <Paper elevation={3}>
        <form onSubmit={SearchEmployee}>
          <Box sx={{ py: 4, px: 2, display: "flex", flexDirection: "row" }}>
            <TextField
              inputRef={keyWordRef}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              placeholder="Search for a user"
            />
            <Button type="submit" sx={{ ml: 2, width: "15%" }} variant="contained">
              {t(`employee.search`)}
            </Button>
          </Box>
        </form>
      </Paper>
      {dataEmployee && (
        <MUIDataTable title="" columns={mainColumns} data={dataEmployee} options={options} />
      )}
      {/* <Alert
        open={open}
        setOpen={setOpen}
        text={"You won't be able to revert after deletion"}
        title={"Do you really want to delete this product?"}
        type="warning"
      /> */}
    </Box>
  );
};

export default Employee;
