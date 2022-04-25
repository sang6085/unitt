import { FormHelperText } from "@mui/material";
import React from "react";

export const getError = (errors: [string]) => {
  if (errors) {
    return errors.map((info) => (
      <FormHelperText sx={{ color: "red", fontSize: 12, mt: 0, ml: 0, marginBottom: "8px" }} key={info}>
        {info}
      </FormHelperText>
    ));
  }
  return null;
};
