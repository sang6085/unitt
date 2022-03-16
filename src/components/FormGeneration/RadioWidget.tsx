import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

const RadioWidget: React.FC<any> = (props) => {
  const { id, schema, value, onChange } = props;
  return (
    <FormControlLabel
      id={id}
      control={<Switch color="primary" checked={Boolean(value)} onChange={() => onChange(!value)} />}
      label={schema.title}
      labelPlacement="start"
      sx={{ my: 1 }}
    />
  );
};

export default RadioWidget;
