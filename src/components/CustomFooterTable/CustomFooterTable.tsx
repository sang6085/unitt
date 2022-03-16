import React from "react";
import {  MenuItem, Pagination, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";


interface IPFooter {
  page?: any;
  rowsPerPage?: any;
  changeRowsPerPage?: any;
  changePage?: any;
  pageSize?: number;
  count?: any;
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


  const [quantity, setQuantity] = React.useState<any>([]);
  React.useEffect(() => {
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
    changePage(value - 1)
  };

  return (
    <Box
      sx={{
        my: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination count={quantity.length} size="large" onChange={handleChange} color="primary" />
      </Box>
      <Box
        sx={{
          my: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mr: 2 }} component={'span'}>Rows per page</Typography>
        <Select
          variant="standard"
          value={pageSize}
          label="Age"
          onChange={(e: any) => handleChangeRowsPerPage(e)}
        >
          {rowsPerPageOptions?.map((item: any, index: any) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
export default CustomFooterTable;
