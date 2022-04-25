import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ChartComponent from "components/Chart/Chart";
import { useStyles } from "components/Card/CardStyle";

interface ICard {
  title: string;
  number: number;
  icon?: any;
  smallNumber: number;
  typeNumber: boolean;
  symbol: string;
  chart?: any;
}

const CardComponent: React.FC<ICard> = ({
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
            <Typography variant="body2" className={classes.fw}>
              {title}
            </Typography>
            <Box className={classes.boxNumber}>
              {typeNumber ? (
                <Box className={classes.trendingUp}>
                  <TrendingUpIcon className={classes.trendingUpIcon} />
                </Box>
              ) : (
                <Box className={classes.trendingDown}>
                  <TrendingDownIcon className={classes.trendingUpIcon} />
                </Box>
              )}
              <Typography
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
              <Typography className={classes.countUp} variant="h4">
                <CountUp end={number} decimal="." separator="," />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} className={classes.itemsCenter}>
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
