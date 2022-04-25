import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export interface IOptionAutoComplete {
  id: any;
  name: string;
}
interface IAutoCompleteComponentProps {
  data: any[];
  variant?: "filled" | "outlined" | "standard";
  label?: string;
  color?: "primary" | "secondary";
  fullWidth?: boolean;
  onChange?: (value?: number) => void;
  size?: "small" | "medium" | undefined;
  value?: any;
  name?: string;
}
const AutoCompleteComponent: React.FC<IAutoCompleteComponentProps> = (props) => {
  const onChange = (event: React.ChangeEvent<{}>, selected: any | null) => {
    props.onChange && props.onChange(selected?.id);
  };
  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant={props.variant || "outlined"}
          color={props.color || "primary"}
          fullWidth={props.fullWidth}
        />
      )}
      //value={props.data.find((item) => item.id === props.value) ?? null}
      onChange={onChange}
      fullWidth={props.fullWidth}
      options={props.data}
	    defaultValue={props.value}
      getOptionLabel={(option) => option.name}
      //getOptionSelected={(option, value) => option.name === value.name}
      size={props.size}
    />
  );
};

export default AutoCompleteComponent;
