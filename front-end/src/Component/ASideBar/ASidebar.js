import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { jwtDecode } from "jwt-decode";
import { MdPayment } from "react-icons/md";

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

export default function Ssidebar() {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    if (!token || typeof token === "undefined" || token === null) {
      history("/Login");
    }
  }, [history]);

  const toggleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev);
  };

  if (!localStorage.getItem("MERN_AUTH_TOKEN")) {
    return null;
  }

  const handleLogout = () => {
    if (localStorage.getItem("MERN_AUTH_TOKEN")) {
      localStorage.removeItem("MERN_AUTH_TOKEN");
      history("/Login");
      window.location.reload();
    } else {
      console.log("No authentication token found. Redirecting to login page.");
      history("/Login");
      window.location.reload();
    }
  };

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const jobRole = decodedToken.role;
  const encodedid =
    jobRole === "Admin" ? encodeURIComponent(decodedToken._id) : "";

  const sidebarItems = [
    {
      name: "Dashboard",
      href: `/ADashbord?$phw=${encodedid}`,
      icon: RiDashboard3Fill,
      Title: "Dashboard",
    },
    {
      name: "ADS Manager",
      href: `/AADSmanager?$phw=${encodedid}`,
      icon: IoMdHeadset,
      Title: "ADS Manager",
    },
    {
      name: "Feedback Manager",
      href: `/Afeedacks?$phw=${encodedid}`,
      icon: VscFeedback,
      Title: "Feedback Manager",
    },
    {
      name: "Announcement ",
      href: `/AAnnouncement?$phw=${encodedid}`,
      icon: TfiAnnouncement,
      Title: "Announcement Manager",
    },
    {
      name: "Add Resources",
      href: `/AAddResources?$phw=${encodedid}`,
      icon: GrResources,
      Title: "Add Resources",
    },
    {
      name: "Teachers",
      href: `/ATeacher?$phw=${encodedid}`,
      icon: LiaChalkboardTeacherSolid,
      Title: "Teachers",
    },
    {
      name: "Students",
      href: `/AStudent?$phw=${encodedid}`,
      icon: PiStudent,
      Title: "Students",
    },
    {
      name: "Payment",
      href: `/Payementmanage?$phw=${encodedid}`,
      icon: MdPayment,
      Title: "Payment",
    }
  ];

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
          <div className="sidebar_link logout_icon" onClick={handleLogout}>
            <span className="sidebar_icon">
              <MdLogout />
            </span>
            <span className="sidebar_name">Logout</span>
          </div>
        </BootstrapTooltip>
      </aside>
    </div>
  );
}
