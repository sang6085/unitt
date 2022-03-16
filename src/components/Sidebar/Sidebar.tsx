import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Sidebar.scss";

import { AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

const Nav = styled.div`
  background: white;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 1.5rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SidebarNav: any = styled.nav`
  background: #15171c;
  width: ${({ sidebar }: any) => (sidebar ? "245px" : "50px")};
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

const SideBar: React.FC = () => {
  const [sidebar, setSidebar] = React.useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className="SideBarContainer">
      <Nav>
        <NavIcon to="#">
          <FaBars onClick={showSidebar} />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#">
            <AiOutlineClose onClick={showSidebar} />
          </NavIcon>
          {/* {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })} */}
          asdasd
        </SidebarWrap>
      </SidebarNav>
    </div>
  );
};

export default SideBar;
