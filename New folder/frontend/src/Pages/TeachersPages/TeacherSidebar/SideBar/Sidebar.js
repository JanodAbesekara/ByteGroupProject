import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { SiGoogleclassroom } from "react-icons/si";
import { MdAssignmentAdd } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";
import { MdGrade } from "react-icons/md";
import { FaBuysellads } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import "./Sidebar.css";

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
    href: "/TDashbord",
    icon: RxDashboard,
    Title: "Dashboard",
  },
  {
    name: "My Profile",
    href: "/UserProfile",
    icon: CgProfile,
    Title: "My Profile",
  },

  {
    name: "Classes",
    href: "/TClasses",
    icon: SiGoogleclassroom,
    Title: "Classes",
  },
  {
    name: "Assignments",
    href: "/Assignments",
    icon: MdAssignmentAdd,
    Title: "Assignments",
  },
  {
    name: "Feedbacks",
    href: "/Feedbacks",
    icon: RiFeedbackFill,
    Title: "Feedbacks",
  },
  {
    name: "Grades",
    href: "/Grades",
    icon: MdGrade,
    Title: "Grades",
  },
  {
    name: "MyAds",
    href: "/MyAds",
    icon: FaBuysellads,
    Title: "MyAds",
  },
  {
    name: "Payment Details",
    href: "/PaymentDeat",
    icon: MdPayment,
    Title: "Payment Details",
  },
  {
    name: "Quizzes",
    href: "/Quizzes",
    icon: MdQuiz,
    Title: "Quizzes",
  },
  {
    name: "Students",
    href: "/Students",
    icon: PiStudentFill,
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
