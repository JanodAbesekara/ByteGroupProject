import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { MdCoPresent } from "react-icons/md";
import { styled } from "@mui/material/styles";
import "./Sidebar.css";
import { jwtDecode } from "jwt-decode";

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
    jobRole === "Lecturer" ? encodeURIComponent(decodedToken._id) : "";

  const sidebarItems = [
    {
      name: "Dashboard",
      href: `/TDashbord?$phw=${encodedid}`,
      icon: RxDashboard,
      Title: "Dashboard",
    },
    {
      name: "My Profile",
      href: `/UserProfile?$phw=${encodedid}`,
      icon: CgProfile,
      Title: "My Profile",
    },
    {
      name: "Classes",
      href: `/TClasses?$phw=${encodedid}`,
      icon: SiGoogleclassroom,
      Title: "Classes",
    },
    {
      name: "Assignments",
      href: `/Assignments?$phw=${encodedid}`,
      icon: MdAssignmentAdd,
      Title: "Assignments",
    },
    {
      name: "Feedbacks",
      href: `/Feedback?$phw=${encodedid}`,
      icon: RiFeedbackFill,
      Title: "Feedbacks",
    },
    {
      name: "Grades",
      href: `/Grades?$phw=${encodedid}`,
      icon: MdGrade,
      Title: "Grades",
    },
    {
      name: "MyAds",
      href: `/MyAds?$phw=${encodedid}`,
      icon: FaBuysellads,
      Title: "MyAds",
    },
    {
      name: "Payment Details",
      href: `/PaymentDetails?$phw=${encodedid}`,
      icon: MdPayment,
      Title: "Payment Details",
    },
    {
      name: "Quizzes",
      href: `/Quizzes?$phw=${encodedid}`,
      icon: MdQuiz,
      Title: "Quizzes",
    },
    {
      name: "Attendence",
      href: `/Attendence?$phw=${encodedid}`,
      icon: MdCoPresent,
      Title: "Attendence",
    },
    {
      name: "Students",
      href: `/Students?$phw=${encodedid}`,
      icon: PiStudentFill,
      Title: "Students",
    },
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
          <Link className="sidebar_link logout_icon" onClick={handleLogout}>
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