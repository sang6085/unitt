import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { getError } from "./utils";

interface ICheckboxCustom {
  id: string;
  required: boolean;
  schema: any;
  value: string | number | boolean;
  rawErrors: any;
  onChange: any;
}

const CheckboxComponent: React.FC<ICheckboxCustom> = (props) => {
  const { id, required, schema, value, onChange, rawErrors } = props;
  // console.log("c", value);
  return (
    <FormControl
      disabled={schema.disabled}
      required={required}
      error={!!(rawErrors && rawErrors.length)}
      style={{ width: "100%" }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id={id}
              checked={!!value}
              onChange={(event) => onChange(event.target.checked)}
              value={schema.title}
            />
          }
          label={schema.title}
        />
      </FormGroup>
      {getError(rawErrors)}
    </FormControl>
  );
};

export default CheckboxComponent;
