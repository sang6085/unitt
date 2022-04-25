import { Box } from "@mui/system";
import { getEmployee } from "services/EmployeeService";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useTranslation } from "react-i18next";
import avatar from "assets/images/default_avatar.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import CustomFooterTable from "components/CustomFooterTable/CustomFooterTable";
import { useStyles } from "pages/Employee/EmployeeStyle";
import { FC, useEffect, useState, useRef, FormEvent } from "react";

const Employee: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [dataEmployee, setDataEmployee] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [order] = useState<{
    isDesc: boolean;
  }>({
    isDesc: false,
  });
  const [keyWord, setKeyWord] = useState<string>("");
  const keyWordRef = useRef<any>("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
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

  const SearchEmployee = (e: FormEvent<HTMLFormElement>) => {
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
                className={classes.imgAvatar}
                src={
                  tableIndex?.tableData[tableIndex.rowIndex][1]
                    .avatarFileName === null ||
                  tableIndex?.tableData[tableIndex.rowIndex][1]
                    .avatarFileName === ""
                    ? avatar
                    : tableIndex?.tableData[tableIndex.rowIndex][1]
                        .avatarFileName
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
          return (
            <Box>{tableIndex?.tableData[tableIndex.rowIndex][1].fullName}</Box>
          );
        },
      },
    },
    {
      name: "personalInfo",
      label: t(`employee.email`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box>{tableIndex?.tableData[tableIndex.rowIndex][1].email}</Box>
          );
        },
      },
    },
    {
      name: "personalInfo",
      label: t(`employee.phone`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box>{tableIndex?.tableData[tableIndex.rowIndex][1].phone}</Box>
          );
        },
      },
    },
    {
      name: "jobInfo",
      label: t(`employee.jobtitle`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box>
              {tableIndex?.tableData[tableIndex.rowIndex][4]?.jobtitleName}
            </Box>
          );
        },
      },
    },
    {
      name: "jobInfo",
      label: t(`employee.department`),
      options: {
        sort: true,
        customBodyRender: (value: any, tableIndex: any) => {
          return (
            <Box>
              {tableIndex?.tableData[tableIndex.rowIndex][4]?.departmentName}
            </Box>
          );
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
            <Box className={classes.wrapperJobInfo}>
              <Box className={classes.jobInfo}></Box>
              {tableIndex?.tableData[tableIndex.rowIndex][4]?.office ===
              null ? (
                <Box>Office</Box>
              ) : (
                <Box>
                  {
                    tableIndex?.tableData[tableIndex.rowIndex][4]?.office[0]
                      ?.name
                  }
                </Box>
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
            <Box className={classes.wrapperAction}>
              <Tooltip title="edit" arrow>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete" arrow>
                <IconButton onClick={() => setOpen(!open)}>
                  <DeleteForeverIcon className={classes.iconAction} />
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
          <Box className={classes.boxSearch}>
            <TextField
              inputRef={keyWordRef}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              placeholder="Search for a user"
            />
            <Button
              type="submit"
              className={classes.btnSearch}
              variant="contained"
            >
              {t(`employee.search`)}
            </Button>
          </Box>
        </form>
      </Paper>
      {dataEmployee && (
        <MUIDataTable
          title=""
          columns={mainColumns}
          data={dataEmployee}
          options={options}
        />
      )}
    </Box>
  );
};

export default Employee;
