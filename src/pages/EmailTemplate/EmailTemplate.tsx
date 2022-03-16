import {
  Box,
  CircularProgress,
  IconButton,
  Switch,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchEmailTemplate } from "../../services/EmailTemplateService";
import TableComponent from "../../components/Table/Table";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { errorHandle } from "../../utils/errorHandler";
import FallBackComponent from "../../components/FallBackComponent/FallBackComponent";

const ProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = React.useState<any>([]);
  const [total, setTotal] = React.useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = React.useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [idEdit, setIdEdit] = React.useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    if (!open) {
      setAnchorEl(event.currentTarget);
      setIdEdit(id);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    async function getData() {
      searchEmailTemplate({
        isDesc: true,
        orderBy: "created_date",
        pageIndex: page,
        pageSize: pageSize,
      }).subscribe((response: any) => {
        console.log(response)
        if (response) {
          setData(response.data.data);
          setTotal(response.data.totalCount);
          setLoading(false);
        }
      });
    }
    getData();
  }, [page, pageSize]);

  const mainColumns = [
    {
      name: "templateCode",
      label: t("emailTemplates.code"),
    },
    {
      name: "templateName",
      label: t("emailTemplates.template_name"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Link to={`/email-templates/edit/${data[tableMeta.rowIndex].id}`}>{value}</Link>;
        },
      },
    },
    {
      name: "templateType",
      label: t("emailTemplates.type"),
    },
    {
      name: "actived",
      label: "Status",
      options: {
        customBodyRender: (value: any) => {
          return <Switch defaultChecked={!!value} />;
        },
      },
    },
    {
      name: "createdDate",
      label: t("emailTemplates.createdDate"),
    },
    {
      name: "createdBy",
      label: t("emailTemplates.createdBy"),
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              <IconButton
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleClick(event, data[tableMeta?.rowIndex].id)
                }
              >
                <MoreHorizTwoToneIcon fontSize="inherit" sx={{ color: "#e7970d" }} />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  const options: any = {
    filterType: "checkbox",
    // serverSide: true,
    download: false,
    print: false,
    filter: false,
    count: total,
    search: false,
    viewColumns: false,
    rowsPerPageOptions: [10, 20, 30],
    // onPageChange: (page: number) => {
    //   setData([]);
    //   setLoading(true);
    //   setPage(page + 1);
    // },
    // onRowsPerPageChange: (pageSize: number) => {
    //   setData([]);
    //   setLoading(true);
    //   setPageSize(pageSize);
    // },
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  const changeEditPage = () => {
    navigate(`/email-templates/edit/${idEdit}`);
  };

  const changeCreatePage = () => {
    navigate(`/email-templates/create`);
  };

  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {t("menu.email_templates")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={changeCreatePage}>
            {t("button.add")}
          </Button>
        </Box>
      </Box>
      <Box className="content">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={changeEditPage}>
            <EditIcon sx={{ mr: 1 }} />
            {t("button.edit")}
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: "#dc3545" }}>
            <DeleteOutlineIcon sx={{ mr: 1 }} />
            {t("button.delete")}
          </MenuItem>
        </Menu>
        <ErrorBoundary FallbackComponent={FallBackComponent} onError={errorHandle}>
          <TableComponent title="Test" data={data} columns={mainColumns} options={options} />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default ProductPage;
