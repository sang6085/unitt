import React from "react";
import { Button, Input, Progress, Table } from "reactstrap";
import avtMan from "../../assets/logo/team-1.jpg";
import avtWomen from "../../assets/logo/team-3.jpg";
import avtWomenTwo from "../../assets/logo/team-2.jpg";
import image from "../../assets/logo/img-1-1000x600.jpg";
import { AiFillLike } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import Bootstrap from "../../assets/logo/bootstrap.jpg";
import Angular from "../../assets/logo/angular.jpg";
import sketch from "../../assets/logo/sketch.jpg";
import Reactt from "../../assets/logo/react.jpg";
import Bitcoin from "../../assets/logo/bitcoin.png";
import { useTranslation } from "react-i18next";

const SessionActivity = () => {
  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        className="row"
      >
        <div className="col-xl-5">
          <ActivityFeed />
        </div>
        <div className="col-xl-7">
          <LightTable />
        </div>
      </div>
    </div>
  );
};

export default SessionActivity;

export const TRTable: React.FC<any> = ({
  name,
  img,
  money,
  status,
  user,
  completion,
  color,
}) => {
  return (
    <tr style={{ height: "90px" }}>
      <td style={{ width: "270px" }}>
        <div style={{ marginTop: 10 }}>
          <img src={img} alt="aaaa" style={{ width: "52px" }} />
          <span style={{ fontWeight: "bold" }}>{name}</span>
        </div>
      </td>
      <td style={{ width: "120px" }}>
        <div style={{ marginTop: 25 }}>{money}</div>
      </td>
      <td style={{ width: "130px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: color,
              borderRadius: 5,
            }}
          ></div>{" "}
          <span style={{ fontSize: "16px", marginLeft: 6 }}>{status}</span>
        </div>
      </td>
      <td style={{ width: "120px" }}>
        <div style={{ marginTop: 25 }}>{user}</div>
      </td>
      <td>
        <div style={{ marginTop: 25, display: "flex", alignItems: "center" }}>
          <span>{completion}%</span>
          <Progress
            value={completion}
            style={{ height: 3, width: "220px", marginLeft: 10 }}
            color={
              completion < 80
                ? "danger"
                : completion < 100
                ? "primary"
                : "success"
            }
          />
        </div>
      </td>
    </tr>
  );
};

export const LightTable = () => {
  const { t } = useTranslation();
  const user = (
    <>
      <img
        style={{
          width: "26px",
          marginLeft: -15,
          height: "26px",
          borderRadius: "40px",
        }}
        src={avtWomen}
        alt="aa"
      />
      <img
        style={{
          marginLeft: -15,
          width: "26px",
          height: "26px",
          borderRadius: "40px",
        }}
        src={avtMan}
        alt="aa"
      />
      <img
        style={{
          width: "26px",
          marginLeft: -10,
          height: "26px",
          borderRadius: "40px",
        }}
        src={avtWomen}
        alt="aa"
      />
      <img
        style={{
          width: "26px",
          marginLeft: -10,
          height: "26px",
          borderRadius: "40px",
        }}
        src={avtWomen}
        alt="aa"
      />
      <img
        style={{
          width: "26px",
          marginLeft: -10,
          height: "26px",
          borderRadius: "40px",
        }}
        src={avtWomen}
        alt="aa"
      />
    </>
  );

  return (
    <div>
      <div
        style={{
          width: "100%",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <div style={{ padding: 20, borderBottom: "1px solid  #e9ecef" }}>
          <span style={{ fontWeight: 600, fontSize: "18px" }}>
            {t(`dashboard.table`)}
          </span>
        </div>
        <Table
          style={{
            overflow: "hidden",
            /* overflow-y: scroll; */
            overflowX: "auto",
            display: "block",
          }}
        >
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
                  PROJECT
                  <RiArrowUpDownFill
                    style={{ marginLeft: 3, fontSize: "13px", color: "black" }}
                  />{" "}
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
                  BUDGET
                  <RiArrowUpDownFill
                    style={{ marginLeft: 3, fontSize: "13px", color: "black" }}
                  />{" "}
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
                  STATUS
                  <RiArrowUpDownFill
                    style={{ marginLeft: 3, fontSize: "13px", color: "black" }}
                  />{" "}
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
                  USERS
                  <RiArrowUpDownFill
                    style={{ marginLeft: 3, fontSize: "13px", color: "black" }}
                  />{" "}
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
                  COMPLETION
                  <RiArrowUpDownFill
                    style={{ marginLeft: 3, fontSize: "13px", color: "black" }}
                  />{" "}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <TRTable
              img={Bootstrap}
              name="Impact Design System"
              status="pending"
              money="$2500 USD"
              color="red"
              user={user}
              completion={60}
            />
            <TRTable
              img={Angular}
              name="Angular Now UI Kit PRO"
              status="completed"
              money="$1800 USD"
              color="green"
              user={user}
              completion={100}
            />
            <TRTable
              img={sketch}
              name="Pixel UI Kit"
              status="delayed"
              money="$4400 USD"
              color="green"
              user={user}
              completion={72}
            />
            <TRTable
              img={Reactt}
              name="React Material Dashboard"
              status="on schedule"
              money="$2500 USD"
              color="lightblue"
              user={user}
              completion={90}
            />
            <TRTable
              img={Bootstrap}
              name="Impact Design System"
              status="pending"
              money="$2500 USD"
              color="red"
              user={user}
              completion={60}
            />
            <TRTable
              img={Angular}
              name="Angular Now UI Kit PRO"
              status="completed"
              money="$1800 USD"
              color="green"
              user={user}
              completion={100}
            />
            <TRTable
              img={sketch}
              name="Pixel UI Kit"
              status="delayed"
              money="$3150 USD"
              color="green"
              user={user}
              completion={72}
            />
            <TRTable
              img={Angular}
              name="Angular Now UI Kit PRO"
              status="completed"
              money="$1800 USD"
              color="green"
              user={user}
              completion={100}
            />
          </tbody>
        </Table>
      </div>
      {/* Two Card */}
      {/* Card One */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        className="row"
      >
        <div className="col-md-12 col-xl-6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              height: "258px",
              background: "#19204d",
              borderRadius: "10px",
              padding: 20,
            }}
          >
            <span
              style={{ fontSize: "22px", color: "white", fontWeight: "bold" }}
            >
              $ 3,300
            </span>
            <span style={{ fontSize: "16px", color: "white", marginTop: 10 }}>
              Your current balance
            </span>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{
                  fontSize: "18px",
                  color: "lightgreen",
                  fontWeight: 500,
                }}
              >
                + 15%
              </span>
              <span
                style={{
                  marginLeft: 10,
                  fontSize: "18px",
                  color: "#686f8a",
                  fontWeight: 500,
                }}
              >
                ($250)
              </span>
            </div>
            <Button
              style={{
                borderRadius: "5px",
                width: "100%",
                height: "30px",
                background: "white",
                fontSize: "14px",
                color: "blue",
                fontWeight: 500,
                marginTop: 20,
              }}
            >
              Add credit
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "white" }}>Order: 40%</span>
                <Progress
                  value={40}
                  color="danger"
                  style={{ height: 3, width: "180px" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "white" }}>Save: 60%</span>
                <Progress
                  value={60}
                  color="success"
                  style={{ height: 3, width: "180px" }}
                />
              </div>
            </div>
          </div>
          {/* Card Two */}
        </div>
        <div className="col-md-12 col-xl-6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              height: "258px",
              background: "linear-gradient(87deg,#f5365c 0,#f56036 100%)",
              borderRadius: "10px",
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 30,
              }}
            >
              <div style={{ display: "flex", flex: 1 }}>
                <img src={Bitcoin} alt="aaaa" />
              </div>
              <Button
                style={{
                  color: "green",
                  background: "white",
                  height: "31px",
                  fontSize: "12px",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                ACTIVE
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 30,
              }}
            >
              <span style={{ color: "#cac7c7", fontSize: "10px" }}>
                USERNAME
              </span>
              <span style={{ fontSize: "26px", color: "white" }}>
                @johnsnow{" "}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#cac7c7", fontSize: "10px" }}>NAME</span>
              <span style={{ fontSize: "26px", color: "white" }}>
                John Snow{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityFeed = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,

        // marginTop: -20
      }}
    >
      <div style={{ borderBottom: "1px solid  #e9ecef", padding: 20 }}>
        <span style={{ fontWeight: "bold" }}>{t(`dashboard.activity`)}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 20,
          borderBottom: "1px solid  #e9ecef",
        }}
      >
        <img
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "10px",
          }}
          src={avtMan}
          alt="aa"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 10,
            flex: 1,
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            John Snow
          </span>
          <span style={{ fontWeight: 600, color: "gray", fontSize: "12px" }}>
            3 days ago
          </span>
        </div>
        <Button
          style={{
            height: "30px",
            color: "white",
            background: "#0a48b3",
            fontSize: "12px",
          }}
        >
          + &nbsp; {t(`button.follow`)}
        </Button>
      </div>
      {/* Post */}
      <div style={{ padding: 20 }}>
        <span style={{ color: "#d1d1d1" }}>
          Personal profiles are the perfect way for you to grab their attention
          and persuade recruiters to continue reading your CV because you’re
          telling them from the off exactly why they should hire you.
        </span>
      </div>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img style={{ width: "95%" }} src={image} alt="aaaa" />
      </div>
      {/* Action post */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 5,
          paddingLeft: 32,
          paddingRight: 32,
          borderBottom: "1px solid  #e9ecef",
          paddingBottom: 30,
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 10,
              fontSize: "12px",
            }}
          >
            <AiFillLike
              style={{ color: "blue", fontSize: "16px", marginRight: 3 }}
            />{" "}
            100
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 10,
              fontSize: "12px",
            }}
          >
            <BsFillChatFill style={{ fontSize: "16px", marginRight: 3 }} /> 28
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 10,
              fontSize: "12px",
            }}
          >
            <FaShare style={{ fontSize: "16px", marginRight: 3 }} /> 30
          </span>
        </div>
        <div>
          <img
            style={{
              width: "22px",
              marginLeft: -15,
              height: "22px",
              borderRadius: "40px",
            }}
            src={avtWomen}
            alt="aa"
          />
          <img
            style={{
              marginLeft: -15,
              width: "22px",
              height: "22px",
              borderRadius: "40px",
            }}
            src={avtMan}
            alt="aa"
          />
          <img
            style={{
              width: "22px",
              marginLeft: -10,
              height: "22px",
              borderRadius: "40px",
            }}
            src={avtWomen}
            alt="aa"
          />
          <span style={{ color: "#d1d1d1", marginLeft: 5 }}>and 30+ more</span>
        </div>
      </div>
      {/* comment */}
      <div style={{ borderBottom: "1px solid  #e9ecef" }}>
        <div style={{ margin: 30 }}>
          <img
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "40px",
              marginBottom: -30,
              marginRight: -10,
            }}
            src={avtWomen}
            alt="aa"
          />
          <div style={{ background: "#e9e9e9", marginLeft: 20 }}>
            <div
              style={{
                marginLeft: 10,
                padding: 20,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Michael Lewis</span>
              <span style={{ color: "#d1d1d1" }}>
                Cras sit amet nibh libero nulla vel metus scelerisque ante
                sollicitudin. Cras purus odio vestibulum in vulputate viverra
                turpis.
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                paddingLeft: 20,
                paddingBottom: 10,
              }}
            >
              <AiFillLike
                style={{ color: "blue", fontSize: "16px", marginRight: 3 }}
              />
              3 like
              <FaShare
                style={{ fontSize: "16px", marginRight: 3, marginLeft: 5 }}
              />{" "}
              1 share
            </div>
          </div>
        </div>
        <div style={{ margin: 30 }}>
          <img
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "40px",
              marginBottom: -30,
              marginRight: -10,
            }}
            src={avtWomenTwo}
            alt="aa"
          />
          <div style={{ background: "#e9e9e9", marginLeft: 20 }}>
            <div
              style={{
                marginLeft: 10,
                padding: 20,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Jessica Stones</span>
              <span style={{ color: "#d1d1d1" }}>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis.
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                paddingLeft: 20,
                paddingBottom: 10,
              }}
            >
              <AiFillLike
                style={{ color: "blue", fontSize: "16px", marginRight: 3 }}
              />
              10 like
              <FaShare
                style={{ fontSize: "16px", marginRight: 3, marginLeft: 5 }}
              />{" "}
              1 share
            </div>
          </div>
        </div>
      </div>
      {/* type Comment */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          borderBottom: "1px solid  #e9ecef",
        }}
      >
        <img
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "40px",
          }}
          src={avtWomen}
          alt="aa"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 10,
            flex: 1,
          }}
        >
          <Input placeholder="Write your comment" />
        </div>
      </div>
    </div>
  );
};
