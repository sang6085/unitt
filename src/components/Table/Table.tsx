import { Fragment, useState, FC } from "react";
import MUIDataTable, { MUIDataTableProps } from "mui-datatables";
import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { useStyles } from "components/Table/TableStyles";
import ViewColumnIcon from "@mui/icons-material/Settings";
import ButtonComponent from "components/Button/Button";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
interface IOptionFilter {
  label: string;
  value: string | number;
}

interface IFilterOption {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "option" | "date";
  options?: IOptionFilter[];
}

interface ITableComponentProps extends MUIDataTableProps {
  filter?: boolean;
  handleFilter?: (data: any) => void;
  formData?: IFilterOption[];
}

const TableComponent: FC<ITableComponentProps> = (props) => {
  const { t } = useTranslation();
  const { filter, handleFilter, formData } = props;
  const classes = useStyles({ qty: formData?.length || 0 });

  const { register, reset, handleSubmit, watch, setValue } = useForm<any>({
    mode: "onChange",
  });
  const [expandFilter, setExpandFilter] = useState<boolean>(false);

  const handleExpand = () => {
    setExpandFilter((prev) => !prev);
  };

  const components = {
    ...props.components,
    icons: { ViewColumnIcon },
  };

  const options = {
    ...props.options,
    jumpToPage: true,
    rowHover: true,
    textLabels: {
      pagination: {
        jumpToPage: "Page:",
      },
      body: {
        noMatch: <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Stack>
      <Paper elevation={0} className={classes.root}>
        {filter && handleFilter ? (
          <form onSubmit={handleSubmit(handleFilter)}>
            <Box mb={2}>
              <Box my={1}>
                <InputLabel>{t("filter.search")}</InputLabel>
                <OutlinedInput
                  {...register("search")}
                  id="outlined-adornment-filter"
                  type="text"
                  fullWidth
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle filter visibility"
                        onClick={handleExpand}
                        edge="end"
                      >
                        {expandFilter ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>

              <Collapse in={expandFilter}>
                <Box py={1}>
                  <Box className={classes.filterBox}>
                    {formData?.map((item, index) => (
                      <Box key={index}>
                        {!item.type ||
                        item.type === "text" ||
                        item.type === "number" ||
                        item.type === "email" ? (
                          <Fragment>
                            <InputLabel>{item.label}</InputLabel>
                            <TextField
                              {...register(item.name)}
                              type={item.type ?? "text"}
                              size="small"
                              fullWidth
                            />
                          </Fragment>
                        ) : item.type === "option" ? (
                          <Box sx={{ minWidth: 120 }}>
                            <InputLabel>{item.label}</InputLabel>
                            <Select
                              {...register(item.name)}
                              size="small"
                              fullWidth
                              defaultValue={
                                item.options && item.options[0]?.value
                              }
                            >
                              {item.options?.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                        ) : (
                          <Box sx={{ minWidth: 120 }}>
                            <InputLabel>{item.label}</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                value={watch(item.name)}
                                onChange={(newValue: any) => {
                                  setValue(item.name, newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    size="small"
                                    {...register(item.name)}
                                    fullWidth
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Stack pt={2} direction="row" justifyContent="center">
                    <ButtonComponent
                      variant="contained"
                      color="secondary"
                      onClick={() => reset()}
                      className={classes.btn}
                    >
                      {t("button.reset")}
                    </ButtonComponent>
                    <ButtonComponent
                      type="submit"
                      variant="contained"
                      className={classes.btn}
                    >
                      {t("button.search")}
                    </ButtonComponent>
                  </Stack>
                </Box>
              </Collapse>
            </Box>
            <Divider
              className={
                props.title ? classes.dividerTitle : classes.dividerNoTitle
              }
            />
          </form>
        ) : null}

        <Box className={classes.table}>
          <MUIDataTable {...props} components={components} options={options} />
        </Box>
      </Paper>
    </Stack>
  );
};

export default TableComponent;
