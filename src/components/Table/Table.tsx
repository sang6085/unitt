import React from "react";
import MUIDataTable, { MUIDataTableProps } from "mui-datatables";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Collapse,
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
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";

interface IOptionFilter {
  label: string;
  value: string | number;
}

interface IFilterOption {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "option";
  options?: IOptionFilter[];
}

interface ITableComponentProps extends MUIDataTableProps {
  filter?: boolean;
  handleFilter?: (data: any) => void;
  formData?: IFilterOption[];
}

const useStyles = makeStyles({
  root: {
    boxShadow: "0 10px 40px 0 rgb(18 106 211 / 7%), 0 2px 9px 0 rgb(18 106 211 / 6%)",
    width: "100%",
    "& .MuiPaper-elevation": {
      boxShadow: "none",
    },
    "& thead": {
      "& th": {
        "& div": {
          color: colors.textColor,
          width: "max-content",
        },
      },
      "& tr": {
        "& th": {
          padding: "10px",
          border: "1px solid rgba(234,243,253,.9)",
        },
      },
    },

    "& tbody": {
      "& .MuiTableCell-root": {
        "& div": {
          color: colors.textColor,
        },
      },
      "& tr": {
        "& td": {
          padding: "10px",
          border: "1px solid rgba(234,243,253,.9)",
        },
      },
    },
    "& tr": {
      "&:nth-child(odd)": {
        backgroundColor: "#f0f6ff",
      },
    },
    "& table": {
      "& tfoot": {
        "& tr": {
          "& td": {
            backgroundColor: "#fff !important",
            borderBottom: "inherit",
          },
        },
      },
    },
  },

  filterBox: (props: { qty: number }) => {
    return {
      width: "100%",
      display: "grid",
      gridTemplateColumns:
        props.qty % 3 === 0
          ? "auto auto auto"
          : props.qty % 4 === 0
          ? "auto auto auto auto"
          : props.qty % 5 === 0
          ? "auto auto auto auto auto"
          : "auto auto auto",
      gap: "10px",
    };
  },
});

const TableComponent: React.FC<ITableComponentProps> = (props) => {
  const { t } = useTranslation();
  const { filter, handleFilter, formData } = props;
  const styles = useStyles({ qty: formData?.length || 0 });

  const { register, handleSubmit } = useForm<any>();
  const [expandFilter, setExpandFilter] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpandFilter((prev) => !prev);
  };

  return (
    <Stack sx={{ width: "100%", position: "relative" }}>
      {filter && handleFilter ? (
        <form onSubmit={handleSubmit(handleFilter)}>
          <Paper elevation={0} className={styles.root}>
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box sx={{ pr: 1 }}>
                <Box sx={{ m: 1, width: "100%" }}>
                  <OutlinedInput
                    {...register("search")}
                    id="outlined-adornment-filter"
                    type="text"
                    fullWidth
                    size="small"
                    placeholder={t("filter.search")}
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
              </Box>

              <Collapse in={expandFilter}>
                <Box sx={{ py: 1, pl: 1 }}>
                  <Box className={styles.filterBox}>
                    {formData?.map((item, index) => (
                      <Box key={index}>
                        {!item.type ||
                        item.type === "text" ||
                        item.type === "number" ||
                        item.type === "email" ? (
                          <React.Fragment>
                            <InputLabel>{item.label}</InputLabel>
                            <TextField
                              {...register(item.name)}
                              type={item.type ?? "text"}
                              size="small"
                              fullWidth
                            />
                          </React.Fragment>
                        ) : (
                          <Box sx={{ minWidth: 120 }}>
                            <InputLabel>{item.label}</InputLabel>
                            <Select
                              {...register(item.name)}
                              size="small"
                              fullWidth
                              defaultValue={item.options && item.options[0]?.value}
                            >
                              {item.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
                    <Button type="reset" variant="outlined" sx={{ mx: 1 }}>
                      {t("button.reset")}
                    </Button>
                    <Button type="submit" variant="contained" sx={{ mx: 1 }}>
                      {t("button.search")}
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          </Paper>
        </form>
      ) : null}

      <Paper elevation={0} sx={{ p: 2 }} className={styles.root}>
        <Box sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
          <MUIDataTable {...props} />
        </Box>
      </Paper>
    </Stack>
  );
};

export default TableComponent;
