import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { getError } from "./utils";

const RadioComponent: React.FC<any> = (props) => {
  const { id, required, schema, value, onChange, rawErrors, options } = props;
  return (
    <FormControl
      component="fieldset"
      disabled={schema.disabled}
      required={required}
      error={!!(rawErrors && rawErrors.length)}
      sx={{ width: "100%", marginTop: 1.5 }}
    >
      <FormLabel style={{ fontSize: 12 }} component="legend">
        {schema.title}
      </FormLabel>
      <RadioGroup
        id={id}
        aria-label={schema.title}
        name={schema.title}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        row
      >
        {options &&
          options.enumOptions.map((o: any) => (
            <FormControlLabel
              key={o.value}
              value={o.value}
              control={<Radio />}
              label={o.label}
              disabled={o.disabled}
            />
          ))}
      </RadioGroup>
      {getError(rawErrors)}
    </FormControl>
  );
};

export default RadioComponent;
