import { Button, Progress, Table } from "reactstrap";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const SessionPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 30,
        marginRight: 0,
      }}
      className="row"
    >
      <div className="Page-visit col-xl-8">
        <PageVisit />
      </div>
      <div className="Social col-xl-4">
        <Social />
      </div>
    </div>
  );
};
export default SessionPage;

export const TRTablePage: React.FC<any> = ({
  page,
  visit,
  status,
  user,
  rate,
}) => {
  return (
    <tr>
      <td>
        <div style={{ marginLeft: "20px" }}>
          <span style={{ fontSize: "13px", color: "gray", fontWeight: "bold" }}>
            {page}
          </span>
        </div>
      </td>
      <td>
        <div style={{ fontSize: "13px", color: "gray" }}>{visit}</div>
      </td>
      <td>
        <div style={{ fontSize: "13px", color: "gray" }}>{user}</div>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          {status === "yes" ? (
            <TiArrowUpThick style={{ color: "lightgreen", marginRight: 10 }} />
          ) : (
            <TiArrowDownThick style={{ color: "red", marginRight: 10 }} />
          )}

          <span style={{ fontSize: "13px", color: "gray" }}>{rate}</span>
        </div>
      </td>
    </tr>
  );
};

export const PageVisit = () => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%", background: "white", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid  #e9ecef",
          padding: 20,
        }}
      >
        <span style={{ flex: 1, fontSize: "18px", fontWeight: 600 }}>
          {t(`dashboard.pagevisit`)}
        </span>
        <Button
          style={{
            background: "#2b2b9d",
            color: "white",
            height: "35px",
            fontSize: "14px",
          }}
        >
          {t(`button.seeall`)}
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table>
          <thead
            style={{ background: "#f1f1f1", borderBottom: "3px solid white" }}
          >
            <tr>
              <th>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                    marginLeft: "20px",
                  }}
                >
                  PAGE NAME
                </div>
              </th>
              <th>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                  }}
                >
                  VISITORS
                </div>
              </th>

              <th>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                  }}
                >
                  UNIQUE USERS
                </div>
              </th>
              <th>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                  }}
                >
                  BOUNCE RATE
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <TRTablePage
              page={"/dashboard/"}
              visit={"4,569"}
              user={"340"}
              rate={"46,53%"}
              status={"yes"}
            />
            <TRTablePage
              page={"/dashboard/index.html"}
              visit={"3,985"}
              user={"319"}
              rate={"46,53%"}
              status={"no"}
            />
            <TRTablePage
              page={"/dashboard/charts.html"}
              visit={"3,513"}
              user={"294"}
              rate={"36,49%"}
              status={"no"}
            />
            <TRTablePage
              page={"/dashboard/tables.html"}
              visit={"2,050"}
              user={"147"}
              rate={" 50,87%"}
              status={"yes"}
            />
            <TRTablePage
              page={"/dashboard/profile.html"}
              visit={"1,795"}
              user={"190"}
              rate={" 46,53%"}
              status={"no"}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export const TRTableSocial: React.FC<any> = ({ name, visitor, percent }) => {
  return (
    <tr>
      <td>
        <div
          style={{
            marginLeft: "20px",
            fontSize: "13px",
            color: "gray",
            paddingTop: 3,
            paddingBottom: 2,
          }}
        >
          {name}
        </div>
      </td>
      <td>
        <div
          style={{
            fontSize: "13px",
            color: "gray",
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          {visitor}
        </div>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "13px",
              color: "gray",
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            {percent}%
          </span>
          <Progress
            value={percent}
            style={{ height: 3, width: "180px", marginLeft: 10 }}
            color={percent > 70 ? "success" : "danger"}
          />
        </div>
      </td>
    </tr>
  );
};

export const Social = () => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%", background: "white", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid  #e9ecef",
          padding: 20,
        }}
      >
        <span style={{ flex: 1, fontSize: "18px", fontWeight: 600 }}>
          {t(`dashboard.social`)}
        </span>
        <Button
          style={{
            background: "#2b2b9d",
            color: "white",
            height: "35px",
            fontSize: "14px",
          }}
        >
          {t(`button.seeall`)}
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table>
          <thead
            style={{ background: "#f1f1f1", borderBottom: "3px solid white" }}
          >
            <tr>
              <th>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                  }}
                >
                  REFERRAL
                </div>
              </th>
              <th>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                  }}
                >
                  VISITORS
                </div>
              </th>
              <th>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "gray",
                    fontSize: "11px",
                  }}
                ></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <TRTableSocial name={"Facebook"} visitor={"1,480"} percent={60} />
            <TRTableSocial name={"Facebook"} visitor={"5,480"} percent={70} />
            <TRTableSocial name={"Google"} visitor={"4,407"} percent={80} />
            <TRTableSocial name={"Instagram"} visitor={"3,678"} percent={75} />
            <TRTableSocial name={"twitter"} visitor={"3,678"} percent={30} />
          </tbody>
        </Table>
      </div>
    </div>
  );
};
