import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableHead,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import TableComponent from "../../components/Table/Table";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getAllMenu } from "../../services/MenuService";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    background: "#9e9e9e24",
  },
}));

const Role = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    getAllMenu().subscribe((response: any) =>{
      // console.log(response);
      setData(response?.data.data[0].children);
      setLoading(false);
    })
    
  }, []);
  const mainColumns = [
    {
      name: "",
      label: "#",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "",
      label: "",
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {/* {openId !== rowData[0] ? (
                <IconButton
                  size="small"
                  // onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  //   handleClick(event, data[tableMeta?.rowIndex].id)
                  // }
                >
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  // onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  //   handleClick(event, data[tableMeta?.rowIndex].id)
                  // }
                >
                  <RemoveCircleOutlineOutlinedIcon sx={{ color: "#00bcd4" }} />
                </IconButton>
              )} */}
              <IconButton
                size="small"
              >
                <RemoveRedEyeOutlinedIcon sx={{ color: "#00bcd4" }} />
              </IconButton>
              <IconButton size="small" onClick={() => navigate(`/permission/edit/${data[tableMeta.rowIndex].id}`)}>
                <EditOutlinedIcon />
              </IconButton>
            </Box>
          );
        },
      },
    },
    {
      name: "code",
      label: "Menu Code",
    },
    {
      name: "url",
      label: "URL",
    },
    {
      name: "sort",
      label: "Sort",
    },
    {
      name: "isActive",
      label: "Status",
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return <Box>{value === 1 ? "Active" : "No Active"}</Box>;
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
    expandableRows: true,
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      console.log(rowData);
      console.log(data[rowMeta.rowIndex]);
      return (
        <React.Fragment>
          <tr>
            <td colSpan={12}>
              <TableContainer style={{ width: "100%", display: "flex", justifyContent: "center" }} component={Paper}>
                <Table size="small" sx={{ width: "90%", borderRadius: 10, my: 2 }} aria-label="simple table">
                  <TableHead sx={{ background: "#9e9e9e24", fontWeight: 600 }}>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell></TableCell>
                      <TableCell>Menu Code</TableCell>
                      <TableCell>URL</TableCell>
                      <TableCell>Sort</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data[rowMeta.rowIndex].children?.map((row: any, index: number) => (
                      <TableRow key={row.id}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            size="small"
                            // onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                            //   handleClick(event, data[tableMeta?.rowIndex].id)
                            // }
                          >
                            <RemoveRedEyeOutlinedIcon fontSize="small" sx={{ color: "#00bcd4" }} />
                          </IconButton>
                          <IconButton size="small" onClick={() => navigate(`/permission/edit/${row.id}`)}>
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>{row.code}</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 120 }}>{row.url}</StyledTableCell>
                        <StyledTableCell>{row.sort}</StyledTableCell>
                        <StyledTableCell>{row.isActive === 1 ? "Active" : "No Active"}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {t("menu.roles_management")}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={() => navigate("/permission/add")}>
              Add
            </Button>
          </Box>
        </Typography>
      </Box>
      <Box className="content">
        <TableComponent title="Test" data={data} columns={mainColumns} options={options} />
      </Box>
    </Box>
  );
};

export default Role;
