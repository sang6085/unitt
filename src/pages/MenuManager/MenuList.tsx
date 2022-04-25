import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import { getAllMenu } from "services/MenuService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { SubmitHandler } from "react-hook-form";
import TableComponent from "components/Table/Table";
import { useTranslation } from "react-i18next";
import { CommonStyles } from "utils/styles";
import StatusCard from "components/StatusCard/StatusCard";
import { useNavigate } from "react-router";
import Confirm from "components/Confirm/Confirm";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { useState, useEffect, Fragment } from "react";

interface IMenuSearch {
  search: string;
  id: number | string;
  code: string;
  url: string;
  status: boolean;
}
const MenuList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const styles = CommonStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<any>([]);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  const onSubmit: SubmitHandler<IMenuSearch> = (data) => console.log(data);

  useEffect(() => {
    getAllMenu().subscribe((response: any) => {
      setData(response?.data.data[0].children);
      setLoading(false);
    });
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
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

  const onShowHiddenMore = (index: number) => {
    let temp_state = [...collapse];
    let temp_element = { ...temp_state[index] };
    temp_element = !collapse[index];
    temp_state[index] = temp_element;
    setCollapse(temp_state);
  }

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {tableMeta.rowIndex + 1}

              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1} pl={1}>
                  {
                    data[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                      <Box py={1} defaultChecked={item?.isActive === 1} key={index}>
                        <Typography key={index} variant={"body2"}>
                          {index + 1}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Collapse>
            </Box>
          );
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
            <Fragment>
              <Box>
                <Tooltip title={collapse[tableMeta.rowIndex] ? t("button.hidden") as string : t("button.show_more") as string}>
                  <IconButton
                    size="small"
                    onClick={() => onShowHiddenMore(tableMeta.rowIndex)}
                  >
                    {
                      collapse[tableMeta.rowIndex]
                        ?
                        <RemoveCircleOutlineIcon className={styles.actionIcons} />
                        :
                        <AddCircleOutlineOutlinedIcon className={styles.actionIcons} />
                    }
                  </IconButton>
                </Tooltip>
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
              </Box>
              {
                <Box>
                  <Collapse in={collapse[tableMeta.rowIndex]}>
                    <Box mt={1} pl={2}>
                      {
                        data[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                          <Box my={1} pl={1} key={index}>
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
                          </Box>
                        ))
                      }
                    </Box>
                  </Collapse>
                </Box>
              }
            </Fragment>
          );
        },
      },
    },
    {
      name: "code",
      label: t("menu_manager.code"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {tableMeta.rowData[2]}

              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1}>
                  {data[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box key={index} py={1}>
                      <Typography key={index} variant={"body2"}>
                        {item.code}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Box>
          );
        },
      }
    },
    {
      name: "url",
      label: "URL",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {tableMeta.rowData[3]}

              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1}>
                  {data[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box py={1} key={index}>
                      <Typography variant={"body2"}>
                        {item.url}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Box>
          );
        },
      }
    },
    {
      name: "sort",
      label: t("menu_manager.sort"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {tableMeta.rowData[4]}
              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1}>
                  {data[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box py={1} key={index}>
                      <Typography variant={"body2"}>
                        {item.sort}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Box>
          );
        },
      }
    },
    {
      name: "isActive",
      label: t("menu_manager.status"),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              <Box>
                {value === 1 ? (
                  <StatusCard type="active" children={t(`emailTemplates.active`)} />
                ) : (
                  <StatusCard type="inactive" children={t(`emailTemplates.inactive`)} />
                )}
              </Box>

              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1} >
                  {data[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box key={index} py="6px">
                      <Box>
                        {value === 1 ? (
                          <StatusCard type="active" children={t(`emailTemplates.active`)} />
                        ) : (
                          <StatusCard type="inactive" children={t(`emailTemplates.inactive`)} />
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

              </Collapse>
            </Box>
          );
        },
      }
    },
  ];

  const options: any = {
    filterType: "checkbox",
    download: false,
    print: false,
    sort: false,
    filter: false,
    search: false,
    viewColumns: true,
    selectableRows: "none",
    responsive: "standard",
    expandableRows: false,
    rowHover: false,
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      <Box className="add-btn">
        <ButtonComponent variant="contained" onClick={onNavigatCreate}>
          {t("button.add")}
        </ButtonComponent>
      </Box>
      <TableComponent
        title={t("table.search_results")}
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
