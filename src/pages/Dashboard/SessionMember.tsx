import React from "react";
import { Button, CustomInput, Input, Progress } from "reactstrap";
import styled from "styled-components";
import avatar from "../../assets/logo/avatar.jpg";
import Bootstrap from "../../assets/logo/bootstrap.jpg";
import Angular from "../../assets/logo/angular.jpg";
import sketch from "../../assets/logo/sketch.jpg";
import Reactt from "../../assets/logo/react.jpg";

import {
  CheckBoxGreen,
  CheckBoxRed,
} from "../../components/CheckBox/CheckboxOne";
import { useTranslation } from "react-i18next";

const SessionMember = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      className="row"
    >
      <div className="col-xl-4">
        <div
          className="member"
          style={{
            background: "white",
            display: "flex",
            flexDirection: "column",
            //maxWidth: "517px",
            borderRadius: "10px",
            // boxShadow: "1px 1px 10px 1px silver",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <div
            style={{
              borderBottom: "1px solid  #e9ecef",
              padding: 20,
              paddingLeft: 30,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              {t(`dashboard.team`)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Member name="John Michael" status="Online" />
            <Member name="Alex Smith" status="In a meeting" />
            <Member name="Samantha Ivy" status="Offline" />
            <Member name="Maria Sulchu" status="Online" />
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        {/* Todo List */}
        <div className="todo-list">
          <div
            className="member"
            style={{
              background: "white",
              display: "flex",
              flexDirection: "column",
              //maxWidth: "517px",
              borderRadius: "10px",
              // boxShadow: "1px 1px 10px 1px silver",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                borderBottom: "1px solid  #e9ecef",
                padding: 20,
                paddingLeft: 30,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                {t(`dashboard.todolist`)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TodoList
                time="10:30 AM"
                title="Call with Dave"
                equalStatus="done"
                left="lightgreen"
                status="done"
                checked={true}
              />
              <TodoList
                time="10:30 AM"
                title="Lunch meeting"
                equalStatus="done"
                left="red"
                status="wait"
                checked={false}
              />
              <TodoList
                time="10:30 AM"
                title="Argon Dashboard Launch"
                equalStatus="done"
                left="lightblue"
                status="wait"
                checked={false}
              />
              <TodoList
                time="10:30 AM"
                title="Winter Hackaton"
                equalStatus="wait"
                left="red"
                status="done"
                checked={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        {/* Progress track */}
        <div className="progress-track">
          <div
            className="member"
            style={{
              background: "white",
              display: "flex",
              flexDirection: "column",
              // maxWidth: "517px",
              borderRadius: "10px",
              // boxShadow: "1px 1px 10px 1px silver",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                borderBottom: "1px solid  #e9ecef",
                padding: 20,
                paddingLeft: 30,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                {t(`dashboard.progress`)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ProgressList
                color={"danger"}
                image={Bootstrap}
                value={60}
                title="Impact Design System"
              />
              <ProgressList
                color={"success"}
                image={Angular}
                value={100}
                title="Angular Now UI Kit PRO"
              />
              <ProgressList
                color={"danger"}
                image={sketch}
                title="Pixel UI Kit"
                value={75}
              />
              <ProgressList
                color={"primary"}
                image={Reactt}
                title="React Material Dashboard"
                value={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionMember;

interface IPMember {
  name?: string;
  status?: string;
}

const StyledButton = styled(Button)`
  background: #0a48b3;
  border: none;
  color: white;
  font-size: 14px;
  width: 50px;
  height: 30px;
`;

export const Member: React.FC<IPMember> = ({ name, status }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",

          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 30,
          paddingRight: 30,
          borderBottom: "1px solid  #e9ecef",
        }}
      >
        <img
          style={{
            width: "58px",
            height: "58px",
            border: "1px solid red",
            borderRadius: "50px",
          }}
          src={avatar}
          alt="avt"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginLeft: 15,
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>{name}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: status !== "Online" ? "red" : "green",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            ></div>
            <span style={{ fontSize: "14px", color: "gray" }}>{status}</span>
          </div>
        </div>
        <div>
          <StyledButton>{t(`button.add`)}</StyledButton>
        </div>
      </div>
    </div>
  );
};

interface IPTodoList {
  status?: string;
  left?: string;
  title?: string;
  time?: string;
  equalStatus?: string;
  checked?: boolean;
}

export const TodoList: React.FC<IPTodoList> = ({
  status,
  left,
  title,
  equalStatus,
  time,
  checked,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",

        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderBottom: "1px solid  #e9ecef",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "-webkit-fill-available",
          minHeight: "58px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            borderLeft: `3px solid ${left}`,
          }}
        >
          <span
            style={{
              marginLeft: 10,
              fontSize: "14px",
              fontWeight: 600,
              textDecorationLine: status === "done" ? "line-through" : "none",
            }}
          >
            {title}
          </span>
          <span
            style={{
              marginLeft: 10,
              fontSize: "13px",
              color: "gray",
              textDecorationLine: status === "done" ? "line-through" : "none",
            }}
          >
            {time}
          </span>
        </div>
        <div style={{ display: "flex" }}>
          {equalStatus === "done" ? (
            <CheckBoxGreen checked={checked} />
          ) : (
            <CheckBoxRed checked={checked} />
          )}
        </div>
      </div>
    </div>
  );
};

interface IPProgress {
  image?: any;
  value?: number;
  title?: string;
  color?: string;
}

export const ProgressList: React.FC<IPProgress> = ({
  image,
  value,
  title,
  color,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",

        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderBottom: "1px solid  #e9ecef",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "-webkit-fill-available",
          minHeight: "58px",
        }}
      >
        <img
          style={{ width: "52px", height: "52px", marginRight: 15 }}
          src={image}
          alt="a"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <span style={{ fontWeight: 500, fontSize: "14px" }}>{title}</span>
          <Progress
            style={{ height: 5, marginTop: 5 }}
            color={color}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};
