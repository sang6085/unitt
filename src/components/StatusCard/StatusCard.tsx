import { Paper, Typography, Box } from "@mui/material";


import CountUp from "react-countup";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
export interface IStatusCard {
  name: string;
  number: number;
  icon: any;
  growth: number;
  bgIcons: any;
}

const StatusCard = (props: IStatusCard) => {
  const { name, number, icon, growth, bgIcons } = props;

  return (
    <Paper
      sx={{
        px: 4,
        py: 2.5,
        display: "flex",
        
        borderRadius: "10px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "40px",
            background: bgIcons,
            height: "38px",
            width: "38px",
          }}
        >
          {icon}
        </Box>
        {/* icon */}
        <Typography sx={{ ml: 2, color: "gray" }}>{name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          pt: 3
        }}
      >
        {growth > 0 ? (
          <ArrowUpwardIcon sx={{ color: "lightgreen" }} />
        ) : (
          <ArrowDownwardIcon sx={{ color: "red" }} />
        )}
        <Typography sx={{ fontWeight: "bold", fontSize: "26px" }}>
          {/* ${number} */}
          <CountUp end={number || 0} duration={Number(2)} separator=',' />
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 2 }}
      >
        {growth > 0 && "+"}
        <Typography sx={{ fontWeight: "bold", mr: 1 }}>  <CountUp end={growth || 0} duration={Number(2)} separator=',' /></Typography>
        {growth > 0 ? (
          <Typography sx={{color: "gray"}}>more</Typography>
        ) : (
          <Typography sx={{color: "gray"}}>less</Typography>
        )}
        <Typography sx={{ ml: 1, fontSize: "16px", color:"gray" }}>than last week</Typography>
      </Box>
    </Paper>
  );
};

export default StatusCard;
