import {
  Box,
  CircularProgress,
  IconButton,
  Switch,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { searchEmailTemplate } from "services/EmailTemplateService";
import TableComponent from "components/Table/Table";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { errorHandle } from "utils/helper";
import FallBackComponent from "components/FallBackComponent/FallBackComponent";
import { useEffect, useState, MouseEvent } from "react";
import { useStyles } from "pages/EmailTemplate/EmailTemplateStyle";

const ProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes=useStyles()

  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const [idEdit, setIdEdit] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    if (!open) {
      setAnchorEl(event.currentTarget);
      setIdEdit(id);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getData() {
      searchEmailTemplate({
        isDesc: true,
        orderBy: "created_date",
        pageIndex: page,
        pageSize: pageSize,
      }).subscribe((response: any) => {
        console.log(response);
        if (response.data) {
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
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                  handleClick(event, data[tableMeta?.rowIndex].id)
                }
              >
                <MoreHorizTwoToneIcon fontSize="inherit" className={classes.MoreHorizTwoToneIcon} />
              </IconButton>
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
    count: total,
    search: false,
    viewColumns: false,
    rowsPerPageOptions: [10, 20, 30],
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
      <Box className={classes.itemsEnd}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={changeCreatePage}>
          {t("button.add")}
        </Button>
      </Box>
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
          <EditIcon />
          {t("button.edit")}
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.iconDelete}>
          <DeleteOutlineIcon />
          {t("button.delete")}
        </MenuItem>
      </Menu>
      <ErrorBoundary FallbackComponent={FallBackComponent} onError={errorHandle}>
        <TableComponent title="Test" data={data} columns={mainColumns} options={options} />
      </ErrorBoundary>
    </Box>
  );
};

export default ProductPage;
