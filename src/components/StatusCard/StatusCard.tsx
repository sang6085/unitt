import { Chip } from "@mui/material";
import { useStyles } from "components/StatusCard/StatusCardStyle";
import { FC } from "react";
interface IStatusCard {
  children: string;
  type: "active" | "inactive";
}



const StatusCard: FC<IStatusCard> = ({ children, type }) => {
  const classes = useStyles();
  return (
    <Chip
      label={children}
      color={type === "active" ? "success" : "error"}
      variant="outlined"
      size="small"
      className={type === "active" ? classes.activeText : classes.inActiveText}
    />
  );
};

export default StatusCard;
