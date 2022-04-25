import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "configs/consts";

const borderColor = colors.borderColorTable;

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: `${colors.boxShadow} !important`,
    width: "100%",
    padding: "16px !important",
    marginBottom: "16px !important",
    background: theme.breakpoints.down("sm") ? "red" : "blue",
    "& .MuiToolbar-root": {
      padding: 0,
    },

    "& .MuiPaper-elevation": {
      boxShadow: "none",
      "& .MUIDataTable-responsiveBase": {
        background: "red",
      },
    },

    "& thead": {
      height: "54px",
      "& th": {
        "& div": {
          color: colors.textColor,
          width: "max-content",
        },
      },

      "& tr": {
        "& th": {
          fontWeight: 500,
          backgroundColor: `${colors.bgPrimary}`,
          padding: "8px !important",
          borderTop: `2px solid ${borderColor}`,
          borderBottom: `2px solid #eff2f9`,
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
          padding: "10px !important",
          borderBottom: "1px solid #dee2e6",
          "& div": {
            fontSize: 13,
          },
        },
        "&:last-child": {
          "& td": {
            borderBottom: "none",
          },
        },
      },
    },

    "& table": {
      borderCollapse: "unset",
      border: `2px solid ${borderColor}`,
      borderBottom: `2px solid ${borderColor}`,
      borderTop: "none",
      //borderBottom: "none",
      "& tfoot": {
        "& .MuiTablePagination-root": {
          marginLeft: 20,
        },
        "& tr": {
          "& td": {
            background: colors.white,
            borderBottom: "none",
            "& div": {
              fontSize: 13,
            },
          },
        },
      },
    },
    "& .tss-5jmwmz-MUIDataTableFooter-root": {
      border: "none",
    },
    "& tr": {
      // "&:nth-child(odd)": {
      //   backgroundColor: colors.bgPrimary,
      // },
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

  btn: {
    margin: "0 8px !important",
  },

  table: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
  },
  footerTable: {
    //borderBottom: `2px solid ${borderColor}`,
  },
  dividerTitle: {
    marginTop: "16px",
    marginBottom: 0,
  },
  dividerNoTitle: {
    marginTop: "16px",
    marginBottom: "24px",
  },
}));
