import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    if (!token || typeof token !== "string") {
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
  let decodedToken;
  let jobRole = "";
  let encodedid = "";

  try {
    decodedToken = jwtDecode(token);
    jobRole = decodedToken.role;
    encodedid =
      jobRole === "Student" ? encodeURIComponent(decodedToken._id) : "";
  } catch (error) {
    console.error("Invalid token:", error);
    history("/Login");
  }

  const sidebarItems = [
    {
      name: "Dashboard",
      href: `/SDashbord?$phw=${encodedid}`,
      icon: RxDashboard,
      Title: "Dashboard",
    },
    {
      name: "My Profile",
      href: `/SProfile?$phw=${encodedid}`,
      icon: CgProfile,
      Title: "My Profile",
    },
    {
      name: "Subject",
      href: `/SSubject?$phw=${encodedid}`,
      icon: MdPlayLesson,
      Title: "Subject",
    },
    {
      name: "Assignments",
      href: `/SAssignment?$phw=${encodedid}`,
      icon: MdAssignmentAdd,
      Title: "Assignments",
    },
    {
      name: "Quizzes",
      href: `/SQuizzes?$phw=${encodedid}`,
      icon: MdQuiz,
      Title: "Quizzes",
    },
    {
      name: "Grades",
      href: `/SGrades?$phw=${encodedid}`,
      icon: MdGrade,
      Title: "Grades",
    },
    {
      name: "Teachers",
      href: `/STeachers?$phw=${encodedid}`,
      icon: GiTeacher,
      Title: "Teachers",
    },
    {
      name: "Payment Details",
      href: `/Payment?$phw=${encodedid}`,
      icon: MdPayment,
      Title: "Payment Details",
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
