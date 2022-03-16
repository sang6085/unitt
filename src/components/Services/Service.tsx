import React from "react";
import { BsCalendar3 } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlinePayment, MdOutlineEmail } from "react-icons/md";
import { GoReport } from "react-icons/go";
import "./Service.scss";
const Service = () => {
  return (
    <div className="container-service">
      <div className="service">
        <div className="icon-service" style={{ background: "green" }}>
          <BsCalendar3 style={{ fontSize: "26px", color: "white" }} />
        </div>
        <span style={{ color: "white" }}>Calendar</span>
      </div>
      <div className="service">
        <div className="icon-service" style={{ background: "blue" }}>
          <BiMap style={{ fontSize: "26px", color: "white" }} />
        </div>
        <span style={{ color: "white" }}>Map</span>
      </div>
      <div className="service">
        <div className="icon-service" style={{ background: "orange" }}>
          <AiOutlineShop style={{ fontSize: "26px", color: "white" }} />
        </div>
        <span style={{ color: "white" }}>Shop</span>
      </div>
      <div className="service">
        <div className="icon-service" style={{ background: "violet" }}>
          <MdOutlinePayment style={{ fontSize: "26px", color: "white" }} />
        </div>
        <span style={{ color: "white" }}>Payment</span>
      </div>
      <div className="service">
        <div className="icon-service" style={{ background: "red" }}>
          <MdOutlineEmail style={{ fontSize: "26px", color: "white" }} />
        </div>
        <span style={{ color: "white" }}>Emails</span>
      </div>
      <div className="service">
        <div className="icon-service" style={{ background: "silver" }}>
          <GoReport style={{ fontSize: "26px", color: "white" }} />
        </div>
        <span style={{ color: "white" }}>Report</span>
      </div>
    </div>
  );
};

export default Service;
