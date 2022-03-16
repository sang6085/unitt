import React from "react";
import Chart from "react-apexcharts";

export const ChartOne = () => {
  const [chart] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            height="350"
          />
        </div>
      </div>
    </div>
  );
};
export const ChartTwo = () => {
  const [chart] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
        foreColor: "white",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  return (
    <div className="app" style={{ paddingRight: "15px" }}>
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chart.options}
            series={chart.series}
            type="line"
            height="350"
          />
        </div>
      </div>
    </div>
  );
};
