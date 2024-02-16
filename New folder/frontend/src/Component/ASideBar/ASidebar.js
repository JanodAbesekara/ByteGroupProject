import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { TfiAnnouncement } from "react-icons/tfi";
import { GrResources } from "react-icons/gr";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { IoMdHeadset } from "react-icons/io";
import { RiDashboard3Fill } from "react-icons/ri";
import "./ASidebar.css";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#1A15BA",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1A15BA",
    fontSize: "12px",
    padding: "8px",
    marginRight: "20px",
  },
}));

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/ADashbord",
    icon: RiDashboard3Fill ,
    Title: "Dashboard",
  },
  {
    name: "ADS Manager",
    href: "/AADSmanager",
    icon: IoMdHeadset,
    Title: "ADS Manager",
  },

  {
    name: "Feedback Manager",
    href: "/Afeedacks",
    icon: VscFeedback ,
    Title: "Feedback Manager",
  },
  {
    name: "Announcement ",
    href: "/AAnnouncement",
    icon: TfiAnnouncement,
    Title: "Announcement Manager",
  },
  {
    name: "Add Resources",
    href: "/Aaddresources",
    icon: GrResources,
    Title: "Add Resources",
  },
  {
    name: "Teachers",
    href: "/Ateacher",
    icon:  LiaChalkboardTeacherSolid ,
    Title: "Teachers",
  },
  {
    name: "Students",
    href: "/Astudent",
    icon: PiStudent,
    Title: "Students",
  },
  
];

export default function Ssidebar() {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(true);

  const toggleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev);
  };

  return (
    <div className="sidebar_Wrapper">
      <aside className="sidebar" data-callapse={isCollapsedSidebar}>
        <button className="btn" onClick={toggleSidebarCollapseHandler}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <ul className="sidebar_list">
          {sidebarItems.map(({ name, href, Title, icon: Icon }) => (
            <li className="sidebar_item" key={name}>
              <BootstrapTooltip title={Title} placement="right" arrow>
                <Link className="sidebar_link" to={href}>
                  <span className="sidebar_icon">
                    <Icon />
                  </span>

                  <span className="sidebar_name">{name}</span>
                </Link>
              </BootstrapTooltip>
            </li>
          ))}
        </ul>
        <BootstrapTooltip title="Logout" placement="right" arrow>
          <Link className="sidebar_link logout_icon" to="/Login">
            <span className="sidebar_icon">
              <MdLogout />
            </span>

            <span className="sidebar_name">Logout</span>
          </Link>
        </BootstrapTooltip>
      </aside>
    </div>
  );
}
