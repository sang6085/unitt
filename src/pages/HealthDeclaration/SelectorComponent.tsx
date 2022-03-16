import { MenuItem, Select } from "@mui/material";
import React from "react";

interface IChildren {
  value?: string;
  label?: any;
}

interface ISelector {
  value?: string;
  defaultValue?: string;
  onChange?: any;
  children?: IChildren[];
  size?: "small" | "medium";
  input?: any;
  name?: string;
  id?: string;
  labelId?: string;
  fullWidth?: boolean;
  registerProps?: any;
}

const SelectorComponent = (props: ISelector) => {
  const { value, onChange, children, size, input, name, id, labelId, fullWidth, registerProps, defaultValue } = props;

  return (
    <Select
      {...registerProps}
      sx={{ pt: 1 }}
      size={size}
      labelId={labelId}
      id={id}
      name={name}
      margin="dense"
      value={value && value}
      defaultValue={defaultValue}
      onChange={onChange}
      input={input}
      fullWidth={fullWidth}
    >
      {Array.isArray(children) && children.length > 0
        ? children?.map((item, index: number) => (
            <MenuItem key={index} value={item.value ?? 1}>
              {item.label}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};

export default SelectorComponent;
