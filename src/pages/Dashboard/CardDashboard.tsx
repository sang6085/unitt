import {
  BsFillHandIndexFill,
  BsFillPieChartFill,
  BsBank,
} from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
const CardDashboard = () => {
  return (
    <>
      <Card
        title="TOTAL TRAFFIC"
        number="350897"
        increaseNumber="3.48"
        time="Since last month"
        icon={<BsFillHandIndexFill />}
        backgroundIcon="#f65442"
      />
      <Card
        title="NEW USERS"
        number="2356"
        increaseNumber="3.48"
        time="Since last month"
        icon={<IoStatsChart />}
        backgroundIcon="linear-gradient(87deg,#fb6340 0,#fbb140 100%)"
      />
      <Card
        title="SALES"
        number="924"
        increaseNumber="3.48"
        time="Since last month"
        icon={<BsBank />}
        backgroundIcon="linear-gradient(87deg,#2dce89 0,#2dcecc 100%)"
      />
      <Card
        title="PERFORMANCE"
        number="49.65"
        increaseNumber="3.48"
        time="Since last month"
        icon={<BsFillPieChartFill />}
        backgroundIcon="linear-gradient(87deg,#11cdef 0,#1171ef 100%)"
      />
    </>
  );
};
export default CardDashboard;

interface IPCard {
  title?: string;
  number?: string;
  increaseNumber?: string;
  time?: string;
  icon?: any;
  backgroundIcon?: any;
}
export const Card: React.FC<IPCard> = ({
  title,
  number,
  increaseNumber,
  time,
  icon,
  backgroundIcon,
}) => {
  const { t } = useTranslation();
  return (
    <div className="col-sm-12 col-md-6 col-xl-3 cardBreadpoint">
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "black",
            paddingLeft: 10,
            flex: 1,
          }}
        >
          <span style={{ color: "gray" }}>{t(`dashboard.${title}`)}</span>
          <span style={{ color: "black", fontSize: "20px", fontWeight: 600 }}>
            <CountUp
              end={Number(number) || 0}
              duration={Number(2)}
              separator=","
              decimals={title === "PERFORMANCE" ? 2 : 0}
            />
            {title === "PERFORMANCE" && "%"}
          </span>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AiOutlineArrowUp style={{ color: "#32CD32" }} />
            <span style={{ marginRight: "15px", color: "#32CD32" }}>
              <CountUp
                end={Number(increaseNumber) || 0}
                duration={Number(2)}
                separator=","
                decimals={2}
              />
              %
            </span>
            <span style={{ color: "gray" }}>{t(`dashboard.${time}`)}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifySelf: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "56px",
              height: "56px",
              background: backgroundIcon ? backgroundIcon : "green",
              borderRadius: "40px",
              fontSize: "24px",
              color: "white",
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};
