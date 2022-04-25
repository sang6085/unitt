import { getAllMenu, getMenuGroupById } from "../../../services/MenuGroupService";
import {
  Box,
  CircularProgress,
  Typography,
  Checkbox,
  Stack,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import StatusCard from "components/StatusCard/StatusCard";
import { useStyles } from "pages/Group/PermissionFeatureStyles";
import TableComponent from "components/Table/Table";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { cancelToken } from "api/common";
import { useState, useEffect } from "react";

interface IMenuComponent {
  valueMenu: any;
  handleChangeMenuValue: (data: any) => void;
  updateArrFunc: (arr: any) => void;
}

const MenuComponent = (props: IMenuComponent) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { updateArrFunc, handleChangeMenuValue } = props;
  const [dataTableMenu, setDataTableMenu] = useState<any>([]);
  const [collapse, setCollapse] = useState<any>([]);
  const [valSelectParent, setValSelectParent] = useState<any>();

  useEffect(() => {
    getMenuGroupById().subscribe((res: any) => {
      const array: any = [];
      res?.data.data?.map((item: any, index: any) => array.push(item.id));
      handleChangeMenuValue(array);
    });

    getAllMenu().subscribe((res: any) => {
      setDataTableMenu(res.data.data[0].children);
      // console.log(res.data[0].children);
      const array: any = [];
      res?.data.data[0].children.map((item: any, index: any) => array.push(false));
      setCollapse(array);
      const arrayCheck: any = [];
      res?.data.data[0].children.map((item: any, index: any) => arrayCheck.push(item.checkOpen));
      setValSelectParent(arrayCheck);

      updateArrFunc(getArrayId(res.data.data));
    });
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArrayId = (data: any) => {
    var arrID: any[] = [];
    data.forEach((item: any, index: any) => {
      if (Boolean(item.checkOpen)) {
        arrID.push(item.id);
      }
      item.children.forEach((itemOne: any, indexOne: any) => {
        if (Boolean(itemOne.checkOpen)) {
          arrID.push(itemOne.id);
        }
      });
    });
    return arrID;
  };

  const updateState = (isParent: any, value: any, indexP: any, indexC: any = -1) => {
    if (isParent) {
      setDataTableMenu((pre: any) => {
        const arr = pre.map((parent: any, i: any) => {
          if (indexP === i) {
            parent.checkOpen = value;
            parent.children = parent.children.map((child: any, iOne: any) => {
              child.checkOpen = value === true ? 1 : 0;
              return child;
            });
            return parent;
          } else return parent;
        });
        updateArrFunc(getArrayId(arr));
        return arr;
      });
    } else {
      setDataTableMenu((pre: any) => {
        const arr = pre.map((parent: any, i: any) => {
          if (indexP === i) {
            var isChecked = 0;
            parent.children = parent.children.map((child: any, iOne: any) => {
              if (iOne === indexC) {
                child.checkOpen = value === true ? 1 : 0;
              }
              if (child.checkOpen === 1) {
                isChecked = 1;
              }
              return child;
            });
            parent.checkOpen = isChecked;
            return parent;
          } else return parent;
        });
        updateArrFunc(getArrayId(arr));
        return arr;
      });
    }
  };

  const clickButton = (index: number) => {
    let temp_state = [...collapse];
    let temp_element = { ...temp_state[index] };
    temp_element = !collapse[index];
    temp_state[index] = temp_element;
    setCollapse(temp_state);
  };

  const columnsTableMenu = [
    {
      name: "#",
      label: "",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box ml={2}>
              {tableMeta.rowIndex + 1}

              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1} pl={2}>
                  {dataTableMenu.length !== 0 &&
                    dataTableMenu[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
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
      name: "code",
      label: t(`menu_group.name`),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Stack justifyContent={"flex-start"} direction={"column"}>
              <Stack direction={"row"}>
                {dataTableMenu.length !== 0 &&
                dataTableMenu[tableMeta?.rowIndex]?.children.length > 0 ? (
                  <Box mr={1}>
                    <Tooltip
                      title={
                        collapse[tableMeta.rowIndex]
                          ? (t("button.hidden") as string)
                          : (t("button.show_more") as string)
                      }
                    >
                      <IconButton
                        className={classes.controlIcon}
                        onClick={() => clickButton(tableMeta?.rowIndex)}
                      >
                        {collapse[tableMeta.rowIndex] ? (
                          <RemoveCircleOutlineIcon />
                        ) : (
                          <ControlPointIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    {tableMeta?.rowData[1]}
                  </Box>
                ) : (
                  <></>
                )}
              </Stack>
              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1} pl={2}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box key={index} py={1}>
                      <Typography key={index} variant={"body2"}>
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Stack>
          );
        },
      },
    },
    {
      name: "url",
      label: "Url",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Stack justifyContent={"flex-start"} flexDirection={"column"}>
              {tableMeta?.rowData[2]}

              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1} pl={2}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box key={index} py={1}>
                      <Typography key={index} variant={"body2"}>
                        {item.url}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Stack>
          );
        },
      },
    },
    {
      name: "isActive",
      label: t(`menu_group.Status`),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {tableMeta.rowData[3] === 1 ? (
                <StatusCard type="active" children={t(`emailTemplates.active`)} />
              ) : (
                <StatusCard type="inactive" children={t(`emailTemplates.inactive`)} />
              )}
              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={1} pl={2}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box key={index} py={1}>
                      {item.isActive === 1 ? (
                        <StatusCard type="active" children={t(`emailTemplates.active`)} />
                      ) : (
                        <StatusCard type="inactive" children={t(`emailTemplates.inactive`)} />
                      )}
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
      name: "checkOpen",
      label: t(`menu_group.Visit`),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Stack direction={"column"} alignItems={"center"}>
              {valSelectParent && (
                <Checkbox
                  size={"small"}
                  onChange={(e: any) => {
                    updateState(true, e.target.checked, tableMeta.rowIndex);
                  }}
                  checked={Boolean(dataTableMenu[tableMeta.rowIndex].checkOpen)}
                />
              )}
              <Collapse in={collapse[tableMeta.rowIndex]}>
                <Box mt={-0.5}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map((item: any, index: any) => (
                    <Box key={index}>
                      <Checkbox
                        onChange={(e: any) => {
                          updateState(false, e.target.checked, tableMeta.rowIndex, index);
                        }}
                        size={"small"}
                        value={item.id}
                        checked={Boolean(item.checkOpen === 1)}
                      />
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Stack>
          );
        },
      },
    },
  ];

  const optionsTableMenu: any = {
    filterType: "checkbox",
    download: false,
    print: false,
    filter: false,
    search: true,
    viewColumns: true,
    responsive: "standard",
    sort: false,
    rowHover: false,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: dataTableMenu.length === 0 && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box className={classes.table}>
      <TableComponent
        title={t("menu_manager.menu")}
        data={dataTableMenu && dataTableMenu}
        columns={columnsTableMenu}
        options={optionsTableMenu}
      />
    </Box>
  );
};

export default MenuComponent;
