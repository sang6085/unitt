import {
  FormControl,
  OutlinedInput as MInput,
  MenuItem,
  Select as MSelect,
  Icon,
  FormLabel,
} from "@mui/material";
// import { styled } from "@mui/styles";
import React from "react";
import { getError } from "./utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const SelecComponentt: React.FC<any> = (props) => {
  const { id, required, schema, value, onChange, rawErrors, options } = props;

  return (
    <FormControl
      disabled={schema.disabled}
      required={required}
      error={!!(rawErrors && rawErrors.length)}
      fullWidth
      size="small"
      variant="outlined"
      sx={{
        my: 1,
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <FormLabel id={`${schema.title}-label`}>{schema.title}</FormLabel>
      <MSelect
        id={id}
        value={value || ""}
        onChange={(event: any) => onChange(event.target.value)}
        size="small"
        name={schema.title}
        input={<MInput name={schema.title} id={`${schema.title}-helper`} />}
        MenuProps={MenuProps}
        multiple={schema.type === "array" ? true : false}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {options &&
          options.enumOptions.map((o: any) => (
            <MenuItem key={o.value} value={o.value} sx={{ display: "flex", alignItems: "center" }}>
              {schema.title === "Icon" ? (
                <Icon baseClassName="fas" className={o.label} sx={{ fontSize: 20, mr: 2 }} />
              ) : null}{" "}
              {o.label}
            </MenuItem>
          ))}
      </MSelect>
      {getError(rawErrors)}

      {/* <FormHelperText sx={{ m: 0 }}>{rawErrors}</FormHelperText> */}
    </FormControl>
  );
};

export default SelecComponentt;
