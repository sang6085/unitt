import { Box, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CountUp from "react-countup";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ChartComponent from "../Chart/Chart";

interface IPCard {
  title: string;
  number: number;
  icon?: any;
  smallNumber: number;
  typeNumber: boolean;
  symbol: string;
  chart?: any;
}

const useStyles = makeStyles({
  boxNumber: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: "16px",
    marginBottom: "8px",
  },
  smallNumberOne: {
    marginLeft: "10px !important",
  },
  smallNumberTwo: {
    marginLeft: "10px !important",
  },
  boxChart: {
    width: "60px",
    height: "36px",
  },
  elevation: {
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(33, 43, 54)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundImage: "none",
    overFlow: "hidden",
    position: "relative",
    boxShadow:
      "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
    zIndex: 0,
    alignItems: "center",
    padding: "24px",
  },
  trendingUp: {
    width: "24px",
    height: "24px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    color: "rgb(84, 214, 44)",
    backgroundColor: "rgba(84, 214, 44, 0.16)",
  },
  trendingDown: {
    width: "24px",
    height: "24px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    color: "rgb(255, 72, 66)",
    backgroundColor: "rgba(255, 72, 66, 0.16)",
  },
});

const CardComponent: React.FC<IPCard> = ({
  title,
  number,
  icon,
  smallNumber,
  typeNumber,
  symbol,
  chart,
}) => {
  const classes = useStyles();
  return (
    <Paper square className={classes.elevation}>
      <Box>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="body2" sx={{ fontWeight: "500" }}>
              {title}
            </Typography>
            <Box className={classes.boxNumber}>
              {typeNumber ? (
                <Box className={classes.trendingUp}>
                  <TrendingUpIcon sx={{ fontSize: "16px" }} />
                </Box>
              ) : (
                <Box className={classes.trendingDown}>
                  <TrendingDownIcon sx={{ fontSize: "16px" }} />
                </Box>
              )}
              <Typography
                sx={{ mb: 0.25, fontWeight: 500 }}
                variant="body2"
                className={
                  typeNumber === true
                    ? classes.smallNumberOne
                    : classes.smallNumberTwo
                }
              >
                {typeNumber === true ? "  +" : "  -"}
                {smallNumber}%
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold", mt: 1.5 }} variant="h4">
                <CountUp end={number} decimal="." separator="," />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sx={{ alignItems: "center", display: "flex" }}>
            <Box className={classes.boxChart}>
              <ChartComponent
                options={chart.options}
                series={chart.series}
                type="bar"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CardComponent;
