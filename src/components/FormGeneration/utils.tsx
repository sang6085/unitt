import { FormHelperText } from "@mui/material";
import React from "react";

export const getError = (errors: [string]) => {
  if (errors) {
    return errors.map((info) => (
      <FormHelperText style={{ color: "red", fontSize: 12, marginTop: 0, marginBottom: 8 }} key={info}>
        {info}
      </FormHelperText>
    ));
  }
  return null;
};
