import { TextField } from "@mui/material";
import React from "react";

interface ITextFieldComponent {
  registerProps?: any;
  key?: string;
  InputProps?: any;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  defaultValue?: string;
}

const TextFieldComponent = ({ registerProps, key, InputProps, fullWidth, size, defaultValue }: ITextFieldComponent) => {
  return (
    <TextField
      {...registerProps}
      key={key}
      size={size}
      fullWidth={fullWidth}
      InputProps={InputProps}
      defaultValue={defaultValue}
    />
  );
};

export default TextFieldComponent;
