import React from "react";
import styled from "styled-components";
import { IoMdNotifications } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsZoomIn } from "react-icons/bs";
import { Input } from "reactstrap";
import logo from "../../assets/logo/vn.png";
import "./Header.scss";
import { Notification } from "../Notification/Notitfication";
import { Setting } from "../Setting/Setting";
import Service from "../Services/Service";
import { useAppSelector } from "../../stores/Store";

const SearchInput: any = styled(Input)`
  width: 280px;
  height: 45px;
  border-radius: 30px;
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  &:focus {
    width: 350px;
    transition: 350ms;
  }
  @media screen and (max-width: 572px) {
    display: ${({ showInputSearch }: any) =>
      showInputSearch ? "inline-grid" : "none !important"};
    width: 100% !important;
  }
`;
const IconFaTimes: any = styled(FaTimes)`
  position: absolute;
  top: 34%;
  right: 3%;
  display: none;
  @media screen and (max-width: 572px) {
    display: ${({ showInputSearch }: any) => showInputSearch && "block"};
  }
`;
const Action: any = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 23px;
  @media screen and (max-width: 572px) {
    display: ${({ showInputSearch }: any) =>
      showInputSearch && "none !important"};
  }
  @media screen and (min-width: 769px) {
    flex-grow: 1;
    justify-content: end;
  }
`;
const WrapperSearchInput: any = styled.div`
  position: relative;

  @media screen and (max-width: 572px) {
    ${({ showInputSearch }: any) => showInputSearch && "width: 100%"};
  }
`;

const DivAvatar: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-right: 10px;
  margin-left: 10px;
  @media screen and (max-width: 768px) {
    flex-grow: 1;
    justify-content: end;
  }
  @media screen and (max-width: 572px) {
    display: ${({ showInputSearch }: any) =>
      showInputSearch && "none !important"};
  }
`;
interface IPHeader {
  onClick?: () => void;
}
const Header: React.FC<IPHeader> = (props) => {
  const userProfile = useAppSelector((state) => state.user.profile);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [showInputSearch, setShowInputSearch] = React.useState(false);
  const toggleInputSearch = () => setShowInputSearch(!showInputSearch);
  const dataNotify = [
    { name: "john", content: "Meeting One", avatar: logo },
    { name: "john", content: "Meeting Two", avatar: logo },
    { name: "john", content: "Meeting Three", avatar: logo },
    { name: "john", content: "Meeting Four", avatar: logo },
  ];

  return (
    <div
      style={{
        width: "100%",
        paddingLeft: "10px",
        paddingRight: "10px",
        background: "green",
        height: "80px",
        backgroundColor: "#0b49b3",
        borderBottom: "1px solid rgba(27, 145, 255, 0.5)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Search */}

      <WrapperSearchInput showInputSearch={showInputSearch}>
        <SearchInput
          placeholder="Search..."
          type="search"
          showInputSearch={showInputSearch}
        />
        <IconFaTimes
          style={{ color: "#00000099" }}
          showInputSearch={showInputSearch}
          onClick={toggleInputSearch}
        />
      </WrapperSearchInput>

      {/* End Search */}
      {/* Action */}

      <Action showInputSearch={showInputSearch}>
        <div className="dropdown menuHeader" style={{ display: "none" }}>
          <FaBars
            style={{
              fontSize: "20px",
              color: "white",
              marginRight: 30,
              cursor: "pointer",
            }}
            onClick={props.onClick}
          />
        </div>
        <div className="dropdown showBsZoomIn">
          <BsZoomIn
            style={{
              fontSize: "20px",
              color: "white",
              marginRight: 30,
              cursor: "pointer",
            }}
            onClick={toggleInputSearch}
          />
        </div>
        <div className="dropdown">
          <IoMdNotifications
            style={{ fontSize: "20px", color: "white", marginRight: 30 }}
          />
          <div className="dropdown-notify">
            <div
              style={{
                fontSize: "16px",
                margin: "20px",
                marginLeft: "25px",
              }}
            >
              You have <span style={{ color: "blue" }}>13</span> notifications.
            </div>

            <Notification dataNotify={dataNotify} />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                bottom: 0,
                marginTop: 20,
                marginBottom: 10,
                color: "blue",
              }}
            >
              View all
            </div>
          </div>
        </div>
        <div className="dropdown">
          <MdContentCopy style={{ fontSize: "18px", color: "white" }} />
          <div className="dropdown-service">
            <Service />
          </div>
        </div>
      </Action>
      {/* End Action */}
      {/* Profile */}
      <DivAvatar showInputSearch={showInputSearch}>
        <div className="dropdown">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={userProfile?.avatarUrl}
              alt="avt"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "30px",
                marginRight: 10,
                border: "2px solid orange",
              }}
            />
            <div
              style={{ fontSize: "15px", color: "white" }}
              className="nameUser"
            >
              {userProfile ? userProfile?.fullName : "Vladimir Ule"}
            </div>
          </div>
          <div className="dropdown-avatar">
            <Setting />
          </div>
        </div>
      </DivAvatar>

      {/* End profile */}
    </div>
  );
};

export default Header;
