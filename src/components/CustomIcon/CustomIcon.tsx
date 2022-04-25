import { FC } from "react";
import {
  DashboardOutlined,
  AllInboxOutlined,
  AssignmentIndOutlined,
  ShoppingCartOutlined,
  AssessmentOutlined,
  ListOutlined,
  CardGiftcardOutlined,
  Inventory2Outlined,
  SettingsOutlined,
} from "@mui/icons-material";

interface ICustomIconProps {
  type: string;
  style?: any;
  color?: string | "";
}

export const CustomIcon: FC<ICustomIconProps> = (props) => {
  const { type, color } = props;
  let com = <SettingsOutlined />;
  if (type === "dashboard") {
    com = <DashboardOutlined sx={{ color: color }} />;
  } else if (type === "customer") {
    com = <AssignmentIndOutlined sx={{ color: color }} />;
  } else if (type === "product") {
    com = <AllInboxOutlined sx={{ color: color }} />;
  } else if (type === "order") {
    com = <ShoppingCartOutlined sx={{ color: color }} />;
  } else if (type === "analytic") {
    com = <AssessmentOutlined sx={{ color: color }} />;
  } else if (type === "category") {
    com = <ListOutlined sx={{ color: color }} />;
  } else if (type === "discount") {
    com = <CardGiftcardOutlined sx={{ color: color }} />;
  } else if (type === "inventory") {
    com = <Inventory2Outlined sx={{ color: color }} />;
  } else {
    com = <SettingsOutlined sx={{ color: color }} />;
  }
  return <span style={{ marginTop: 5 }}>{com}</span>;
};
