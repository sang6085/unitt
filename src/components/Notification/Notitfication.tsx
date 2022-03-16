import React from "react";
import logo from "../../assets/logo/vn.png";

interface IPropsData {
  name?: string;
  avatar?: any;
  content: string;
}
interface IPropsNotify {
  dataNotify: IPropsData[];
}

export const Notification: React.FC<IPropsNotify> = ({ dataNotify }) => {
  return (
    <div>
      {dataNotify?.map((item: any, index: any) => (
        <div
          key={index}
          style={{
            marginTop: "20px",
            paddingLeft: "15px",
            paddingRight: "15px",
            display: "flex",
            flexDirection: "row",
            height: "53px",
            borderBottom: "0.1px solid #dfdfdf",
          }}
        >
          <img
            src={logo}
            alt="avt"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "30px",
              marginRight: 15,
              marginLeft: 10,
            }}
          />
          <div>
            <span style={{ fontWeight: "bold" }}>{item.name}</span> <br />
            <p
              style={{
                overflow: "hidden",
                width: "300px",
                textOverflow: "ellipsis",
                fontSize: "14px",
                color: "gray",
              }}
            >
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
