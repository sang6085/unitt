import React from 'react'
import Select, { SelectProps } from '@mui/material/Select';


const SelectComponent:React.FC<SelectProps> = (props) => {
  return (
    <Select size="small" {...props} />
  )
}

export default SelectComponent