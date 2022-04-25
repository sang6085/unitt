import { FC } from "react";
import Select, { SelectProps } from '@mui/material/Select';


const SelectComponent:FC<SelectProps> = (props) => {
  return (
    <Select size="small" {...props} />
  )
}

export default SelectComponent