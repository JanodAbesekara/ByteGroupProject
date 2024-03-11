import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdAssignmentAdd } from "react-icons/md";
import { MdGrade } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { MdPlayLesson } from "react-icons/md";
import "./SSidebar.css";

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
    href: "/SDashbord",
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
    name: "Subject",
    href: "/SSubject",
    icon: MdPlayLesson,
    Title: "Subject",
  },
  {
    name: "Assignments",
    href: "/SAssignment",
    icon: MdAssignmentAdd,
    Title: "Assignments",
  },
  {
    name: "Quizzes",
    href: "/SQuizzes",
    icon: MdQuiz,
    Title: "Quizzes",
  },
  {
    name: "Grades",
    href: "/SGrades",
    icon: MdGrade,
    Title: "Grades",
  },
  {
    name: "Teachers",
    href: "/Students",
    icon: GiTeacher,
    Title: "Teachers",
  },
  {
    name: "Payment Details",
    href: "/Payment",
    icon: MdPayment,
    Title: "Payment Details",
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
