import TextFieldMui from '@mui/material/TextField';
import { TextFieldProps } from "@mui/material";

const TextField: React.FC<TextFieldProps> = (props) => {
  return <TextFieldMui size="small" {...props} />;
};
export default TextField;
