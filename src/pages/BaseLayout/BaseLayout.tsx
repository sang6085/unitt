import React from "react";
import "./BaseLayout.scss";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { getProfile } from "../../api/Account";

import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo/dark.svg";
import { CgMenuRight } from "react-icons/cg";
import SubMenu from "../../components/Sidebar/SubMenu";
import { SidebarList } from "../../components/Sidebar/SidebarList";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getMenuAccount } from "../../api/Menu";
import { AuthenticationToken } from "../Login/LoginInterface";

// const listMenu = [
//   {
//     text: "Dash Board",
//     url: "/dashboard",
//     icon: <DashboardTwoToneIcon />,
//   },
//   {
//     text: "Health Declaration",
//     url: "/healthDeclaration",
//     icon: <RequestQuoteTwoToneIcon />,
//   },
//   {
//     text: "Calendar",
//     url: "/calendar",
//     icon: <CalendarTodayIcon />,
//   },
//   {
//     text: "Task",
//     url: "/task",
//     icon: <TaskTwoToneIcon />,
//   },
//   {
//     text: "Notification",
//     url: "/notification",
//     icon: <NotificationsActiveTwoToneIcon />,
//   },
//   {
//     text: "Profile",
//     url: "",
//     icon: <AccountBoxTwoToneIcon />,
//   },
//   {
//     text: "Messages",
//     url: "/messages",
//     icon: <MessageTwoToneIcon />,
//   },
//   {
//     text: "Setting",
//     url: "/setting",
//     icon: <SettingsOutlinedIcon />,
//   },
//   {
//     text: "Contact",
//     url: "/contact",
//     icon: <ContactPhoneTwoToneIcon />,
//   },
//   {
//     text: "Report",
//     url: "/report",
//     icon: <ReportTwoToneIcon />,
//   },
//   {
//     text: "About",
//     url: "/about",
//     icon: <ReportProblemTwoToneIcon />,
//   },
// ];

const widthSidebar = "245px";

const NavIcon = styled(Link)`
  margin-right: 1.5rem;
  margin-left: 1rem;
  font-size: 20px;
  height: 80px;
  display: flex;
  align-items: center;
`;
const SidebarNav: any = styled.nav`
  @media screen and (max-width: 1200px) {
    width: ${({ sidebar }: any) => (!sidebar ? 0 : "250px")};
    overflow: hidden;
  }
  @media screen and (min-width: 1200px) {
    width: ${({ sidebar }: any) => (sidebar ? "245px" : "50px")};
  }
  background: white;

  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const WrapperContent: any = styled.div`
  @media screen and (max-width: 1200px) {
    margin-left: 0;
  }
  @media screen and (min-width: 1200px) {
    margin-left: ${({ sidebar }: any) => (sidebar ? "245px" : "50px")};
  }

  width: 100%;
  transition: margin-left 350ms ease-in-out;
`;
const Backdrop: any = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 1200px) {
    ${({ sidebar }: any) => sidebar && "display: block"}
  }
`;

const BaseLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authToken: AuthenticationToken | undefined = useAppSelector(
    (state) => state.user.authToken
  );

  const [pageName, setPageName] = React.useState<string>("");

  const [sidebar, setSidebar] = React.useState(true);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [menu, setMenu] = React.useState<any>();

  const showSidebar = () => setSidebar(!sidebar);
  const handleClickIconHeader: () => void = () => {
    showSidebar();
  };
  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
    setPageName(location.pathname.slice(1));
  }, [navigate, location]);
  React.useEffect(() => {
    function getUserProfile() {
      dispatch(getProfile());
    }
    getUserProfile();
    if (authToken?.accessToken) {
      getMenuAccount().then((response) => {
        setMenu(response.data);
        setLoading(false);
      });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <div
            style={{ display: "flex", alignItems: "center", height: "80px" }}
          >
            {sidebar ? (
              <NavIcon to="#">
                <div style={{ flex: 1, marginRight: "70px" }}>
                  <img style={{ width: "80px" }} alt="logo" src={logo} />
                </div>
              </NavIcon>
            ) : (
              <></>
            )}

            <CgMenuRight
              style={{
                display: "flex",
                justifySelf: "flex-end",
                marginLeft: "17px",
                marginTop: "7px",
                cursor: "pointer",
              }}
              onClick={showSidebar}
              color="black"
              className="menuSidebar"
            />
          </div>

          {SidebarList.map((item: any, index: any) => {
            return <SubMenu sidebar={sidebar} item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
      <WrapperContent sidebar={sidebar}>
        <Header onClick={handleClickIconHeader} />
        <Outlet />
        <Footer />
        <Backdrop onClick={showSidebar} sidebar={sidebar} />
      </WrapperContent>
    </div>
  );
};

export default BaseLayout;
