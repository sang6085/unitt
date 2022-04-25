import React from "react";
import { MenuItem, Pagination, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useStyles } from "components/CustomFooterTable/CustomFooterTableStyle";

interface IPFooter {
  page?: number;
  rowsPerPage?: any;
  changeRowsPerPage?: any;
  changePage?: any;
  pageSize?: number;
  count?: number;
  setPageSize?: any;
  rowsPerPageOptions?: Number[];
}

const CustomFooterTable: React.FC<IPFooter> = ({
  count,
  changePage,
  pageSize,
  setPageSize,
  rowsPerPageOptions,
}) => {
  const [quantity, setQuantity] = useState<any>([]);
  const classes = useStyles();
  useEffect(() => {
    // quantityPage();
    async function quantityPage() {
      let arr = [];
      if (pageSize !== undefined && count !== undefined) {
        for (let i = 0; i < Number(Math.floor(count / pageSize) + 1); i++) {
          arr.push(i);
        }
      }
      setQuantity(arr);
    }
    quantityPage();
  }, [count, pageSize]);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(event.target.value);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // console.log(value)
    changePage(value - 1);
  };

  return (
    <Box className={classes.wrapperFooter}>
      <Box className={classes.rowsPerPage}>
        <Typography className={classes.mr} component={"span"}>
          Rows per page
        </Typography>
        <Select
          variant="standard"
          value={pageSize}
          onChange={(e: any) => handleChangeRowsPerPage(e)}
        >
          {rowsPerPageOptions?.map((item: any, index: any) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className={classes.itemsCenter}>
        <Pagination
          showFirstButton
          showLastButton
          count={quantity.length}
          size="small"
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};
export default CustomFooterTable;
