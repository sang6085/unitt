import React from "react";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { getAllMenu, getMenuGroupById } from "../../services/MenuGroupService";
import {
  Box,
  CircularProgress,
  Typography,
  Checkbox,

} from "@mui/material";
import { useTranslation } from "react-i18next";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const getMuiTheme = () =>
  createTheme({
    overrides: {
      MUIDataTableSearch: {
        searchIcon: {
          opacity: 0,
        },
      },
    },
  });

interface IMenuComponent {
  valueMenu: any;
  handleChangeMenuValue: (data: any) => void;
  updateArrFunc: (arr: any) => void;
}

const MenuComponent = (props: IMenuComponent) => {
  const { t } = useTranslation();
  const { updateArrFunc, handleChangeMenuValue } = props;
  const [dataTableMenu, setDataTableMenu] = React.useState<any>([]);
  const [collapse, setCollapse] = React.useState<any>();
  const [valSelectParent, setValSelectParent] = React.useState<any>();

  React.useEffect(() => {
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
      res?.data.data[0].children.map((item: any, index: any) =>
        arrayCheck.push(item.checkOpen)
      );
      setValSelectParent(arrayCheck);

      updateArrFunc(getArrayId(res.data.data));
    });
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

  const updateState = (
    isParent: any,
    value: any,
    indexP: any,
    indexC: any = -1
  ) => {
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
            <Box sx={{ marginLeft: 2 }}>
              {tableMeta.rowIndex + 1}

              {collapse !== undefined && collapse[tableMeta.rowIndex] ? (
                <Box sx={{ mt: 1, pl: 2 }}>
                  {dataTableMenu.length !== 0 &&
                    dataTableMenu[tableMeta.rowIndex]?.children.map(
                      (item: any, index: any) => (
                        <Box
                          sx={{ pt: 1, pb: 1 }}
                          defaultChecked={item?.isActive === 1}
                          key={index}
                        >
                          <Typography key={index} sx={{ fontSize: "14px" }}>
                            {index + 1}
                          </Typography>
                        </Box>
                      )
                    )}
                </Box>
              ) : (
                <></>
              )}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {dataTableMenu.length !== 0 &&
                dataTableMenu[tableMeta?.rowIndex]?.children.length > 0 ? (
                  <Box sx={{ mr: 1 }}>
                    <ControlPointIcon
                      onClick={() => clickButton(tableMeta?.rowIndex)}
                      sx={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    />
                  </Box>
                ) : (
                  <></>
                )}
                {tableMeta?.rowData[1]}
              </Box>
              {collapse !== undefined && collapse[tableMeta.rowIndex] ? (
                <Box sx={{ mt: 1, pl: 2 }}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map(
                    (item: any, index: any) => (
                      <Box key={index} sx={{ pt: 1, pb: 1 }}>
                        <Typography key={index} sx={{ fontSize: "14px" }}>
                          {item.label}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              ) : (
                <></>
              )}
            </Box>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              {tableMeta?.rowData[2]}

              {collapse !== undefined && collapse[tableMeta.rowIndex] ? (
                <Box sx={{ mt: 1, pl: 2 }}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map(
                    (item: any, index: any) => (
                      <Box key={index} sx={{ pt: 1, pb: 1 }}>
                        <Typography key={index} sx={{ fontSize: "14px" }}>
                          {item.url}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              ) : (
                <></>
              )}
            </Box>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              {tableMeta.rowData[3] === 1 ? (
                <Typography sx={{ fontSize: "14px" }}>
                  {" "}
                  {t(`emailTemplates.active`)}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "14px" }}>
                  {t(`emailTemplates.inactive`)}
                </Typography>
              )}
              {collapse !== undefined && collapse[tableMeta.rowIndex] ? (
                <Box sx={{ mt: 1, pl: 2 }}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map(
                    (item: any, index: any) => (
                      <Box key={index} sx={{ pt: 1, pb: 1 }}>
                        {item.isActive === 1 ? (
                          <Typography key={index} sx={{ fontSize: "14px" }}>
                            {t(`emailTemplates.active`)}
                          </Typography>
                        ) : (
                          <Typography key={index} sx={{ fontSize: "14px" }}>
                            {t(`emailTemplates.inactive`)}
                          </Typography>
                        )}
                      </Box>
                    )
                  )}
                </Box>
              ) : (
                <></>
              )}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {valSelectParent && (
                <Checkbox
                  size={"small"}
                  onChange={(e: any) => {
                    updateState(true, e.target.checked, tableMeta.rowIndex);
                  }}
                  checked={Boolean(dataTableMenu[tableMeta.rowIndex].checkOpen)}
                />
              )}
              {collapse !== undefined && collapse[tableMeta.rowIndex] ? (
                <Box sx={{ mt: -0.5 }}>
                  {dataTableMenu[tableMeta.rowIndex]?.children.map(
                    (item: any, index: any) => (
                      <Box key={index} sx={{}}>
                        <Checkbox
                          name={index}
                          onChange={(e: any) => {
                            updateState(
                              false,
                              e.target.checked,
                              tableMeta.rowIndex,
                              index
                            );
                          }}
                          size={"small"}
                          value={item.id}
                          checked={Boolean(item.checkOpen === 1)}
                        />
                      </Box>
                    )
                  )}
                </Box>
              ) : (
                <></>
              )}
            </Box>
          );
        },
      },
    },
  ];

  const optionsTableMenu: any = {
    download: false,
    print: false,
    filter: false,
    search: true,
    viewColumns: false,
    pagination: false,
    selectableRows: "none",
    expandableRows: false,
    textLabels: {
      body: {
        noMatch: dataTableMenu.length === 0 && (
          <CircularProgress color="primary" />
        ),
      },
    },
  };

  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title="Menu"
          data={dataTableMenu && dataTableMenu}
          columns={columnsTableMenu}
          options={optionsTableMenu}
        />
      </MuiThemeProvider>
    </>
  );
};

export default MenuComponent;
