import React from "react";
import { useAppSelector } from "../../stores/Store";
import { FaHome } from "react-icons/fa";
import { Button } from "reactstrap";

import "./Dashboard.scss";
import styled from "styled-components";
import ChartDashboard from "./ChartDashBoard";
import CardDashboard from "./CardDashboard";
import SessionMember from "./SessionMember";
import SessionActivity from "./SessionActivity";
import SessionPage from "./SessionPage";
import { useTranslation } from "react-i18next";

const StyleButton = styled(Button)`
  background: white;
  margin-left: 10px;
  width: 58px;
  padding: 0;
  color: blue;
  font-size: 12px;
  height: 30px;
  &: hover {
    background: white;
    color: blue;
    transform: scale(1.1);
    transition: 350ms;
  }
`;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container-dashboard">
      <div className="card-container">
        <div className="div-bread">
          <div className="bread">
            <span style={{ fontSize: "22px", fontWeight: "bold" }}>
              {t(`dashboard.default`)}
            </span>
            <FaHome
              style={{ marginLeft: "15px", marginRight: "15px" }}
              className="media768"
            />
            <span style={{ fontWeight: "bold" }} className="media768">
              - {t(`dashboard.breadcrumb`)}{" "}
            </span>
            <span className="media768">&ensp;- {t(`dashboard.default`)}</span>
          </div>
          <div className="divBreadButton">
            <StyleButton>{t(`button.new`)}</StyleButton>
            <StyleButton>{t(`button.filter`)}</StyleButton>
          </div>
        </div>
        {/* Card */}
        <div className="row card">
          <CardDashboard />
        </div>
        {/* End Card */}
      </div>
      {/* Chart */}
      <div className="row chart">
        <ChartDashboard />
      </div>
      {/* Session Member */}
      <div className="session-member">
        <SessionMember />
      </div>

      {/* Session Activity */}
      <div className="session-activity">
        <SessionActivity />
      </div>
      {/* Session page */}
      <div>
        <SessionPage />
      </div>
    </div>
  );
};

export default Dashboard;
