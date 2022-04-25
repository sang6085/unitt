import { Grid, Box, Typography, Paper, Button, Menu, MenuItem, Stack } from "@mui/material";
import { useState, FC, MouseEvent } from "react";
import CardComponent from "components/Card/Card";
import ChartComponent from "components/Chart/Chart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStyles } from "pages/DashBoard/DashboardStyle";

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
      colors: ["rgb(200, 250, 205)", "rgb(91, 229, 132)", "rgb(0, 171, 85)", "rgb(0, 123, 85)"],
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box>
      {/* Fours Card */}
      <Grid container spacing={2} className={classes.boxCard}>
        {dataCard.map((item: any, index: any) => (
          <Grid item xs={12} md={4} key={index}>
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
        <Grid item xs={12} md={4}>
          <Paper className={classes.elevation} square>
            <Box>
              <Typography variant="h6" className={classes.titleChar}>
                Current Download
              </Typography>
            </Box>
            <Box className={classes.boxChartDonut}>
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
        <Grid item xs={12} md={8} sx={{ zIndex: 1 }}>
          <Paper className={classes.elevation} square>
            <Stack direction="row">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" className={classes.titleChar}>
                  Area Installed
                </Typography>
                <Typography variant="body1" className={classes.colorTitleChar}>
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
                  className={classes.dropdownYear}
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
            </Stack>

            <Box className={classes.boxChartLine}>
              <ChartComponent
                options={chartLine.options}
                series={chartLine.series}
                type="line"
                height="200%"
                width="100%"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoardPage;
