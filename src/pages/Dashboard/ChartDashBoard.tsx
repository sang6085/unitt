import styled from "styled-components";
import { Button } from "reactstrap";
import { ChartOne, ChartTwo } from "../../components/Charts/Chart";
import { useTranslation } from "react-i18next";

const StyleBtnOneChart = styled(Button)`
  background: #0a48b3;
  border: none;
  color: white;
  width: 80px;
  border-radius: 6px;
`;
const StyleBtnTwoChart = styled(Button)`
  background: white;
  margin-left: 10px;
  border: none;
  color: #0a48b3;
  width: 80px;
  border-radius: 6px;
`;
const ChartDashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="col-xl-8">
        <div className="chart-two">
          <div style={{ display: "flex", margin: 20 }}>
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <span
                style={{ color: "gray", fontSize: "10px", fontWeight: "bold" }}
              >
                {t(`dashboard.overview`)}
              </span>
              <span
                style={{ fontSize: "16px", fontWeight: "bold", color: "white" }}
              >
                {t(`dashboard.sales`)}
              </span>
            </div>
            {/* Button Chart */}
            <div style={{ display: "flex" }}>
              <StyleBtnOneChart>{t(`button.month`)}</StyleBtnOneChart>
              <StyleBtnTwoChart>{t(`button.week`)}</StyleBtnTwoChart>
            </div>
          </div>
          <ChartTwo />
        </div>
      </div>
      <div className="col-xl-4">
        <div className="chart-one">
          <div style={{ display: "flex", flexDirection: "column", margin: 20 }}>
            <span style={{ color: "gray", fontSize: "10px" }}>
              {" "}
              {t(`dashboard.performance`)}
            </span>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {t(`dashboard.total`)}
            </span>
          </div>

          <ChartOne />
        </div>
      </div>
    </>
  );
};

export default ChartDashboard;
