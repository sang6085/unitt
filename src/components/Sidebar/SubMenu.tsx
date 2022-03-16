import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: gray;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  height: 36px;
  padding-left: 3rem;
  display: flex;
  color: gray;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  transition: 350ms;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

const SubMenu = ({ item, sidebar }: any) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={"/" + item?.path} onClick={item.subNav && showSubnav}>
        <div>
          <span style={{ fontSize: "19px", color: `${item.color}` }}>
            {item.icon}
          </span>
          {sidebar ? <SidebarLabel>{item.title}</SidebarLabel> : <></>}
        </div>
        {sidebar ? (
          <div>
            {item.subNav && subnav ? (
              <div style={{ color: "blue" }}>{item.iconOpen}</div>
            ) : item.subNav ? (
              item.iconClose
            ) : null}
          </div>
        ) : (
          <></>
        )}
      </SidebarLink>
      <Collapse isOpen={subnav}>
        {subnav &&
          item.subNav.map((item: any, index: any) => {
            return (
              <DropdownLink to={"/" + item?.path} key={index}>
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            );
          })}
      </Collapse>
    </>
  );
};

export default SubMenu;
