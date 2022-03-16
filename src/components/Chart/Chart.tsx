import React from "react";
import Chart from "react-apexcharts";

interface ICharts {
  width?: string | number | undefined;
  height?: string | number | undefined;
  series?: any[] | undefined;
  options?: ApexCharts.ApexOptions | undefined;
  type?:
    | "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | undefined;
}

const ChartComponent: React.FC<ICharts> = (props) => {
  return (
    <div>
      <Chart
        options={props.options}
        series={props.series}
        type={props.type}
        height={props.height}
        width={props.width}
      />
    </div>
  );
};

export default ChartComponent;
