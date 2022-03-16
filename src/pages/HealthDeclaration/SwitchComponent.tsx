import { Switch, FormControlLabel } from "@material-ui/core";
import React from "react";

interface IFormControl {
  label: string;
  defaultChecked?: boolean;
  registerProps?: any;
  onChange?: any;
}
const SwitchComponent = ({ registerProps, label, defaultChecked, onChange }: IFormControl) => {
  return (
    <FormControlLabel
      control={
        <Switch
          className="switches-button"
          {...registerProps}
          defaultChecked={defaultChecked ?? false}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};

export default SwitchComponent;
