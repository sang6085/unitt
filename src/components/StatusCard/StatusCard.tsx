import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface IStatusCard {
  children: string;
  type: "active" | "inactive";
}

const useStyles = makeStyles({
  activeText: {
    minWidth: 50,
    padding: "4px 8px",
    borderRadius: "4px",
    background: "rgba(84, 214, 44, 0.16)",
    color: "#229a16",
    width: "max-content",
    textAlign: "center",
    fontSize: "0.75rem",
  },
  inActiveText: {
    minWidth: 50,
    padding: "4px 8px",
    borderRadius: "4px",
    background: "rgba(255, 72, 66, 0.16)",
    color: "rgb(183, 33, 54)",
    width: "max-content",
    textAlign: "center",
    fontSize: "0.75rem",
  },
});

const StatusCard: React.FC<IStatusCard> = ({ children, type }) => {
  const classes = useStyles();
  return (
    <Typography
      sx={{ fontWeight: 500 }}
      variant={"body2"}
      className={type === "active" ? classes.activeText : classes.inActiveText}
    >
      {children}
    </Typography>
  );
};

export default StatusCard;
