import {
  Box,
  CircularProgress,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { getAllMenu } from "../../services/MenuService";
import { styled } from "@mui/material/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubmitHandler } from "react-hook-form";
import TableComponent from "../../components/Table/Table";
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";
import { CommonStyles } from "../../utils/styles";
import StatusCard from "../../components/StatusCard/StatusCard";
import { useNavigate } from "react-router";
import Confirm from "../../components/Confirm/Confirm";

interface IMenuSearch {
  search: string;
  id: number | string;
  code: string;
  url: string;
  status: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    background: "#f0f6ff",
  },
}));

const MenuList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const styles = CommonStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any>([]);
  const [isOpenConfirm, setIsOpenConfirm] = React.useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  const onSubmit: SubmitHandler<IMenuSearch> = (data) => console.log(data);

  React.useEffect(() => {
    getAllMenu().subscribe((response: any) => {
      // console.log(response);
      setData(response?.data.data[0].children);
      setLoading(false);
    });
  }, []);

  const onNavigatCreate = () => {
    navigate("/menu-manager/create");
  };

  const onNavigateEdit = (id: number | string) => {
    navigate(`/menu-manager/edit/${id}`);
  };

  const onNavigateView = (id: number | string) => {
    navigate(`/menu-manager/view/${id}`);
  };

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "",
      label: t("menu_manager.action"),
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <>
              <Tooltip title={t("detail.view") as string}>
                <IconButton
                  size="small"
                  onClick={() => onNavigateView(data[tableMeta.rowIndex]?.id)}
                >
                  <RemoveRedEyeIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("detail.edit") as string}
                onClick={() => onNavigateEdit(data[tableMeta.rowIndex]?.id)}
              >
                <IconButton size="small">
                  <DriveFileRenameOutlineIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("detail.delete") as string}>
                <IconButton size="small" onClick={() => setIsOpenConfirm(true)}>
                  <DeleteIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
    {
      name: "code",
      label: t("menu_manager.code"),
    },
    {
      name: "empty",
      label: " ",
    },
    {
      name: "url",
      label: "URL",
    },
    {
      name: "sort",
      label: t("menu_manager.sort"),
    },
    {
      name: "isActive",
      label: t("menu_manager.status"),
      options: {
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {value === 1 ? (
                <StatusCard type="active" children={t(`emailTemplates.active`)} />
              ) : (
                <StatusCard type="inactive" children={t(`emailTemplates.inactive`)} />
              )}
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
    sort: false,
    filter: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    expandableRows: true,
    rowHover: false,
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      return (
        <React.Fragment>
          <tr>
            <td colSpan={12}>
              <TableContainer>
                <Table
                  size="small"
                  sx={{ width: "100%", borderRadius: 10 }}
                  aria-label="simple table"
                >
                  <TableBody>
                    {data[rowMeta.rowIndex].children?.map((row: any, index: number) => (
                      <TableRow key={row.id}>
                        <StyledTableCell>&nbsp;</StyledTableCell>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>
                          <>
                            <Tooltip title={t("detail.view") as string}>
                              <IconButton size="small" onClick={() => onNavigateView(row.id)}>
                                <RemoveRedEyeIcon className={styles.actionIcons} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={t("detail.edit") as string}
                              onClick={() => onNavigateEdit(row.id)}
                            >
                              <IconButton size="small">
                                <DriveFileRenameOutlineIcon className={styles.actionIcons} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t("detail.delete") as string}>
                              <IconButton size="small" onClick={() => setIsOpenConfirm(true)}>
                                <DeleteIcon className={styles.actionIcons} />
                              </IconButton>
                            </Tooltip>
                          </>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography sx={{ color: colors.primaryColor }}>{row.code}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography sx={{ color: colors.primaryColor }}>{row.url}</Typography>{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography sx={{ color: colors.primaryColor }}>{row.sort}</Typography>{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.isActive === 1 ? (
                            <StatusCard type="active" children={t(`emailTemplates.active`)} />
                          ) : (
                            <StatusCard type="inactive" children={t(`emailTemplates.inactive`)} />
                          )}
                        </StyledTableCell>
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
      <Box className="add-btn">
        <Button variant="contained" onClick={onNavigatCreate}>
          {t("button.add")}
        </Button>
      </Box>
      <TableComponent
        title=""
        data={data}
        columns={columns}
        options={options}
        filter={true}
        handleFilter={onSubmit}
        formData={[
          {
            label: t("menu_manager.code"),
            name: "code",
          },
          {
            label: "Url ",
            name: "url",
          },
          {
            label: t("menu_manager.status"),
            name: "status",
            type: "option",
            options: [
              {
                label: "No Active",
                value: 0,
              },
              {
                label: "Active",
                value: 1,
              },
            ],
          },
        ]}
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

export default MenuList;
