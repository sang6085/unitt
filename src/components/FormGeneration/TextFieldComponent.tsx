import { Box, FormLabel, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { getError } from "./utils";


const BaseInput: React.FC<any> = (props) => {
  const { id, required, schema, value, onChange, rawErrors } = props;
  return (
    <Box sx={{ py: 1 }}>
      <FormLabel>
        {schema.title}
      </FormLabel>
      <TextField
        id={id}
        error={!!(rawErrors && rawErrors.length)}
        disabled={schema.disabled}
        required={required}
        size="small"
        value={value || ""}
        onChange={(event) => onChange(event.target.value || null)}
        autoComplete="nope"
        InputProps={{
          startAdornment: schema.prefix ? <InputAdornment position="start">{schema.prefix}</InputAdornment> : null,
          endAdornment: schema.suffix ? <InputAdornment position="end">{schema.suffix}</InputAdornment> : null,
        }}
        fullWidth
        type={schema.format}
      />
      {getError(rawErrors)}
    </Box>
  );
};

export default BaseInput;
