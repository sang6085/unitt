import React, { FC } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import CardComponent from "../../components/Card/Card";
import ChartComponent from "../../components/Chart/Chart";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const useStyles = makeStyles({
  containerDB: {
    width: "100%",
    height: `calc(100vh - 100px)`,
    overFlowY: "auto",
    padding: "0 24px 8px 24px",
    marginBottom: "8px",
  },
  paper: {
    borderRadius: "15px !important",
    paddingTop: "25px",
    paddingBottom: "25px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  boxTextSaleOverview: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
  },
  boxIconActive: {
    paddingRight: 10,
    marginTop: 20,
  },
  fourInfo: {
    display: "flex",
    alignItems: "center",
  },
  iconActive: {
    marginRight: "10px !important",
    padding: 10,
    color: "white",
    width: "22px",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  typoFourInfo: {
    fontSize: "12px !important",
  },
  imgBg: {
    display: "flex",
    justifyContent: "center",
    "& img": {
      width: "90%",
    },
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
});

const DashBoardPage: FC = () => {
  const classes = useStyles();
  const chartDonut: any = {
    options: {
      dataLabels: {
        enabled: false,
      },
      labels: ["Mac", "Window", "IOS", "Android"],
      legend: {
        position: "bottom",
        width: 340,
        markers: {},
      },
      colors: [
        "rgb(200, 250, 205)",
        "rgb(91, 229, 132)",
        "rgb(0, 171, 85)",
        "rgb(0, 123, 85)",
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "90%",
            labels: {
              show: true,
              value: { show: true, fontSize: "30px" },
              total: {
                show: true,
                fontSize: "16px",
                fontWeight: 400,
              },
            },
          },
        },
      },
    },
    series: [44, 55, 41, 17],
  };

  const chartLine: any = {
    options: {
      colors: ["rgb(0, 171, 85)", "rgb(255, 231, 0)"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
      },
      grid: {
        show: false,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
    },
    series: [
      {
        name: "Asia",
        type: "line",
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
      },
      {
        name: "America",
        type: "line",
        data: [20, 30, 70, 80, 40, 16, 40, 20, 51],
      },
    ],
  };

  const dataCard: any = [
    {
      title: "Total Active Users",
      number: 53000,
      symbol: "$",
      smallNumber: 55,
      typeNumber: true,
      chart: {
        options: {
          dataLabels: {
            enabled: false,
          },

          chart: {
            toolbar: {
              show: false,
              type: "bar",
            },
            sparkline: {
              enabled: true,
            },
          },
          grid: {
            show: false,
          },
          legend: {
            position: "bottom",
            width: 3,
            markers: {},
          },
          colors: ["rgba(0, 171, 85, 0.85)"],

          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: "60%",
            },
          },
          yaxis: { show: false },
        },
        series: [
          {
            data: [
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 18,
              },
              {
                x: "",
                y: 13,
              },
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 18,
              },
              {
                x: "",
                y: 13,
              },
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 18,
              },
              {
                x: "",
                y: 13,
              },
              {
                x: "",
                y: 13,
              },
            ],
          },
        ],
      },
    },
    {
      title: "Total Installed",
      number: 3462,
      symbol: "+",
      smallNumber: 2,
      typeNumber: false,
      chart: {
        options: {
          dataLabels: {
            enabled: false,
          },

          chart: {
            toolbar: {
              show: false,
              type: "bar",
            },
            sparkline: {
              enabled: true,
            },
          },
          grid: {
            show: false,
          },
          legend: {
            position: "bottom",
            width: 3,
            markers: {},
          },
          colors: ["rgba(45, 153, 255, 0.85)"],

          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: "60%",
            },
          },
          yaxis: { show: false },
        },
        series: [
          {
            data: [
              {
                x: "",
                y: 4,
              },
              {
                x: "",
                y: 7,
              },
              {
                x: "",
                y: 9,
              },
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 15,
              },
              {
                x: "",
                y: 8,
              },
              {
                x: "",
                y: 13,
              },
              {
                x: "",
                y: 14,
              },
              {
                x: "",
                y: 24,
              },
              {
                x: "",
                y: 20,
              },
            ],
          },
        ],
      },
    },
    {
      title: "Total Downloads",
      number: 2300,
      symbol: "",
      smallNumber: 3,
      typeNumber: true,
      chart: {
        options: {
          dataLabels: {
            enabled: false,
          },

          chart: {
            toolbar: {
              show: false,
              type: "bar",
              
            },
            sparkline: {
              enabled: true,
            },
          },
          grid: {
            show: false,
          },

          legend: {
            position: "bottom",
            width: 3,
            markers: {},
          },
          colors: ["rgba(255, 108, 64, 0.85)"],
          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: "60%",
            },
          },
          yaxis: { show: false },
        },
        series: [
          {
            data: [
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 6,
              },
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 18,
              },
              {
                x: "",
                y: 13,
              },
              {
                x: "",
                y: 10,
              },
              {
                x: "",
                y: 18,
              },
              {
                x: "",
                y: 13,
              },
              {
                x: "",
                y: 20,
              },
            ],
          },
        ],
      },
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box>
      {/* Fours Card */}
      <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid item xs={12} sx={{ zIndex: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              {dataCard.map((item: any, index: any) => (
                <Grid item xs={4} key={index}>
                  <CardComponent
                    title={item.title}
                    number={item.number}
                    smallNumber={item.smallNumber}
                    typeNumber={item.typeNumber}
                    symbol={item.symbol}
                    chart={item.chart}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.elevation} square>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Current Download
              </Typography>
            </Box>
            <Box
              sx={{
                height: "392px",
                marginTop: "40px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <ChartComponent
                options={chartDonut.options}
                series={chartDonut.series}
                type="donut"
                width="380"
                height="auto"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8} sx={{ zIndex: 1 }}>
          <Paper className={classes.elevation} square>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Area Installed
                </Typography>
                <Typography variant="body1" sx={{ color: "rgb(99, 115, 129)" }}>
                  (+43%) than last year
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  size="small"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "rgb(33, 43, 54)",
                    backgroundColor: "rgb(244, 246, 248)",
                  }}
                >
                  2019
                </Button>
                <Menu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    2019
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    2020
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box sx={{ height: "392px", marginTop: "40px" }}>
              <ChartComponent
                options={chartLine.options}
                series={chartLine.series}
                type="line"
                height="230%"
                width={750}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoardPage;
