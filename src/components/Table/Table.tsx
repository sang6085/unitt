import React from "react";
import MUIDataTable, {
  FilterType,
  MUIDataTableOptions,
  MUISortOptions,
  MUIDataTableCustomHeadRenderer,
  MUIDataTableMeta,
  CustomHeadLabelRenderOptions,
  Display,
  MUIDataTableFilterOptions,
  MUIDataTableCustomFilterListOptions,
} from "mui-datatables";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "../../Contexts/ThemeContext";
import { MuiThemeProvider, createTheme } from "@material-ui/core";
import { grey } from "@mui/material/colors";

import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import MenuComponent from "../Menu/Menu";
export interface IOptionColumns extends IColumn {
  hidden: boolean;
}

interface IOption extends MUIDataTableOptions {
  onChangeViewColumn: (name: string) => SubmitHandler<any>;
  handleFilter: (data: any) => void;
  handleExport: () => void;
}
interface ITableProps {
  title: string | React.ReactNode;
  data: any;
  columns: IColumn[];
  columnsOption?: IOptionColumns[];
  options: IOption;
  components?: any;
  filter?: boolean;
  borderRow?: boolean;
}

interface ISelectItem {
  label: string;
  name: string;
}
interface IColumn {
  name: string;
  label?: string;
  selector?: ISelectItem[];
  options?: {
    customToolbar?: () => void | React.ReactNode;
    customBodyRender?: (
      value: any,
      tableMeta: MUIDataTableMeta,
      updateValue: (value: string) => void
    ) => string | React.ReactNode;
    customToolbarSelect?: (
      selectedRows: {
        data: Array<{
          index: number;
          dataIndex: number;
        }>;
        lookup: {
          [key: number]: boolean;
        };
      },
      displayData: {
        data: any[];
        dataIndex: number;
      }[],
      setSelectedRows: (rows: number[]) => void
    ) => React.ReactNode | React.ReactNode;
    customBodyRenderLite?: (dataIndex: number, rowIndex: number) => string | React.ReactNode;
    customHeadLabelRender?: (options: CustomHeadLabelRenderOptions) => string | React.ReactNode;
    customFilterListOptions?: MUIDataTableCustomFilterListOptions;
    customFilterListRender?: (value: any) => string;
    customHeadRender?: (
      columnMeta: MUIDataTableCustomHeadRenderer,
      handleToggleColumn: (columnIndex: number) => void,
      sortOrder: MUISortOptions
    ) => string | React.ReactNode;
    draggable?: boolean;
    display?: Display;
    download?: boolean;
    empty?: boolean;
    expandableRows?: boolean;
    renderExpandableRow?: (
      rowData: string[],
      rowMeta: { dataIndex: number; rowIndex: number }
    ) => React.ReactNode;
    selectableRows?: "none" | "multiple" | "single";
    filter?: boolean;
    filterList?: string[];
    filterOptions?: MUIDataTableFilterOptions;
    filterType?: FilterType;
    hint?: string;
    print?: boolean;
    searchable?: boolean;
    setCellHeaderProps?: (columnMeta: MUIDataTableCustomHeadRenderer) => object;
    setCellProps?: (cellValue: string, rowIndex: number, columnIndex: number) => object;
    sort?: boolean;
    sortCompare?: (
      order: MUISortOptions["direction"]
    ) => (obj1: { data: any }, obj2: { data: any }) => number;
    sortDescFirst?: boolean;
    sortThirdClickReset?: boolean;
    sortDirection?: "asc" | "desc" | "none";
    viewColumns?: boolean;
    serverSide?: boolean;
  };
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 150,
    },
  },
};

const useStyles = makeStyles({
  MUICustom: (props: { colors: { colorText: string; colorSelected: string } }) => {
    return {
      "& .MuiInputBase-root": {
        color: `${props.colors.colorText}`,
      },
      "& .MuiPaper-root": {
        background: "none",
        boxShadow: "none",
        color: props.colors.colorText,
      },
      "& .MuiToolbar-root": {
        color: `${props.colors.colorText}`,
      },
      "& .MuiTableCell-root": {
        color: `${props.colors.colorText}`,
      },
      "& table": {
        "& th": {
          background: "none",
          color: props.colors.colorText,
        },
      },
      // "& .MuiSvgIcon-root": {
      //   color: props.colors.colorText,
      // },
      "& .MuiButton-label": {
        "& div": {
          "& div": {
            color: props.colors.colorText,
            "& span": {
              "& svg": {
                color: `${props.colors.colorText}`,
              },
            },
          },
        },
      },
      "& .mui-row-selected": {
        background: `${props.colors.colorSelected}`,
      },
    };
  },
});

const TextFieldWrapper = styled(TextField)`
  fieldset {
    border-radius: 40px;
  }
`;

const TableComponent = (props: ITableProps) => {
  const { t } = useTranslation();
  const { onChangeViewColumn, handleFilter, handleExport } = props.options;
  const useThemeContext = useTheme();
  const colorText: string = useThemeContext.modeTheme === "dark" ? grey[300] : grey[800];
  const colorSelected: string = useThemeContext.modeTheme === "dark" ? "#121212" : grey[200];
  const styles = useStyles({ colors: { colorText, colorSelected } });
  const filter = props.filter === undefined ? true : props.filter;
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);

  const [searchColumn, setSearchColumn] = React.useState<string>("");
  const { register, handleSubmit } = useForm<any>();

  const [anchorElColumns, setAnchorElColumns] = React.useState<null | HTMLElement>(null);
  const openColumns = Boolean(anchorElColumns);
  const handleClickSetColumn = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElColumns(event.currentTarget);
  };
  const handleCloseSetColumn = () => {
    setAnchorElColumns(null);
    setSearchColumn("");
  };

  const onChangeSearchColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchColumn(event.target.value);
  };

  const onChangeOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const columns = props.columnsOption
    ? props.columns.concat(props.columnsOption.filter((element) => element.hidden === false))
    : props.columns;

  const theme = createTheme({
    palette: {
      primary: {
        main: useThemeContext.colorTheme,
      },
    },
    overrides: {
      MuiTable: {
        root: {
          border: "2px solid #d3d3d3",
        },
      },
      MuiTableCell: {
        root: {
          borderColor: "#d3d3d3",
          "&:not(:last-child)": {
            borderRight: [[1, "solid", "#d3d3d3"]],
          },
        },
        head: {
          border: "2px solid #d3d3d3",
          "&:not(:last-child)": {
            borderRight: [[1, "solid", "#d3d3d3"]],
          },
        },
      },
      MuiTableSortLabel: {
        root: {
          alignItems: "flex-start",
        },
      },
      MuiTableFooter: {
        root: {
          border: "1px solid #d3d3d3",
        },
      },

      // MUIDataTable
      MUIDataTableHeadCell: {
        sortLabelRoot: {},
      },

      MUIDataTableToolbar: {
        actions: {
          background: "red",
        },
      },
    },
  });

  const themeDefault = createTheme({
    palette: {
      primary: {
        main: useThemeContext.colorTheme,
      },
    },
    overrides: {
      MUIDataTableToolbarSelect: {
        root: {
          position: "fixed",
          bottom: 0,
          left: 0,
          background:
            useThemeContext.modeTheme === "dark" ? "#121212 !important" : "#fff !important",
          width: "100%",
          zIndex: 9999,
        },
        title: {
          color: useThemeContext.modeTheme === "dark" ? grey[400] : grey[800],
        },
        deleteIcon: {
          color: useThemeContext.modeTheme === "dark" ? grey[400] : grey[800],
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={props.borderRow ? theme : themeDefault}>
      <form onSubmit={handleSubmit(handleFilter)}>
        <Paper sx={{ mb: 2 }}>
          {openFilter ? (
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {columns.map((item, index) =>
                item.name ? (
                  <Box
                    key={item.name}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      ml: index !== 0 ? 1 : 0,
                    }}
                  >
                    <Typography component="span" sx={{ fontSize: 13 }}>
                      {item.label}:{" "}
                    </Typography>
                    <FormControl sx={{ m: 1, width: 200 }}>
                      {item.selector && item.selector.length > 0 ? (
                        <Select
                          {...register(item.name)}
                          labelId="select-data"
                          id="demo-select-data"
                          // value={age}
                          // onChange={handleChange}
                          MenuProps={MenuProps}
                          size="small"
                          sx={{ borderRadius: 5 }}
                          defaultValue=""
                        >
                          <MenuItem value="">All</MenuItem>
                          {item.selector.map((selectorItem) => (
                            <MenuItem key={selectorItem?.name} value={selectorItem?.name}>
                              {selectorItem?.label}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <TextFieldWrapper
                          {...register(item.name)}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          placeholder="All"
                        />
                      )}
                    </FormControl>
                  </Box>
                ) : null
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexGrow: 1,
                  minWidth: 200,
                  ml: 2,
                }}
              >
                <Typography component="span" sx={{ fontSize: 13 }}>
                  Search:{" "}
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextFieldWrapper
                    {...register("search")}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 5, px: 6, py: 1, textTransform: "inherit" }}
                >
                  Filter
                </Button>
              </Box>
            </Box>
          ) : null}
        </Paper>
        <Paper className={styles.MUICustom}>
          <Box
            sx={{ px: 3, py: 2, display: "flex", flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Button
                variant="outlined"
                startIcon={<SystemUpdateAltIcon />}
                sx={{ borderRadius: 5, px: 3, py: 1, textTransform: "inherit" }}
                onClick={() => handleExport()}
              >
                Export
              </Button>
            </Box>
            {props.columnsOption && props.columnsOption?.length > 0 ? (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  variant={openColumns ? "contained" : "outlined"}
                  startIcon={<ViewWeekIcon />}
                  sx={{ borderRadius: 5, px: 3, py: 1, textTransform: "inherit" }}
                  onClick={handleClickSetColumn}
                >
                  Columns
                </Button>
              </Box>
            ) : null}
            {filter ? (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  variant={openFilter ? "contained" : "outlined"}
                  startIcon={<FilterListIcon />}
                  sx={{ borderRadius: 5, px: 3, py: 1, textTransform: "inherit" }}
                  onClick={onChangeOpenFilter}
                >
                  Filter
                </Button>
              </Box>
            ) : null}
          </Box>

          {/* Table */}
          <MUIDataTable
            title={""}
            columns={columns}
            data={props.data}
            options={props.options}
            components={props.components}
          />

          {/* Menu */}

          <MenuComponent
            anchorEl={anchorElColumns}
            open={openColumns}
            handleClose={handleCloseSetColumn}
          >
            <Box
              sx={{
                width: 350,
                p: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: 13 }} color="primary">
                Find Column
              </Typography>
              <TextField
                placeholder="Column title"
                value={searchColumn}
                onChange={onChangeSearchColumn}
                size="small"
                variant="standard"
                fullWidth
                sx={{ my: 1 }}
              />
              {props.columnsOption &&
                props.columnsOption.map((item: any, index: number) =>
                  item.label.indexOf(searchColumn) !== -1 ? (
                    <Box key={index}>
                      <Switch
                        defaultChecked={!item.hidden}
                        onChange={() => {
                          onChangeViewColumn(item.name as string);
                        }}
                      />
                      {item.label}
                    </Box>
                  ) : null
                )}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button>{t("button.hide_all")}</Button>
                <Button>{t("button.show_all")}</Button>
              </Box>
            </Box>
          </MenuComponent>
        </Paper>
      </form>
    </MuiThemeProvider>
  );
};

export default TableComponent;
