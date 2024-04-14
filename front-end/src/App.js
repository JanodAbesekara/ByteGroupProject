import "./App.css";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Contactus from "./Pages/Contactus/Contactus";
import Library from "./Pages/Library/Library";
import Classes from "./Pages/Classes/Classes";
import Assignments from "./Pages/TeachersPages/Assignments/Assignments";
import TDashbord from "./Pages/TeachersPages/TDashbord/TDashbord";
import Feedback from "./Pages/TeachersPages/Feedback/Feedback";
import Grades from "./Pages/TeachersPages/Grades/Grades";
import MyAds from "./Pages/TeachersPages/MyAds/MyAds.jsx"
import PaymentDetails from "./Pages/TeachersPages/PaymentDetails/PaymentDetails";
import Quizzes from "./Pages/TeachersPages/Quizzes/Quizzes";
import Students from "./Pages/TeachersPages/Students/Students";
import TClasses from "./Pages/TeachersPages/TClasses/TClasses";
import UserProfile from "./Pages/TeachersPages/UserProfile/UserProfile";
import Registrationform from "./Pages/Registrationform/Registrationform";
import SDashbord from "./Pages/StudentPages/SDashbord/SDashbord";
import ADashbord from "./Pages/AdminPages/ADashbord/ADashbord";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import Resetpassword from "./Pages/Resetpassword/Resetpassword";
import Aaddresources from "./Pages/AdminPages/Aaddresources/Aaddresources";
import AADSmanager from "./Pages/AdminPages/AADSmanager/AADSmanager";
import AAnnouncement from "./Pages/AdminPages/AAnnounceent/AAnnounceent";
import Afeedacks from "./Pages/AdminPages/Afeedbackmanager/Afeedbackmanager";
import Astudent from "./Pages/AdminPages/Astudent/Astudent";
import Ateacher from "./Pages/AdminPages/Ateachers/Ateachers";
import Payment from "./Pages/StudentPages/Payment/PaymentHis";
import SAssignment from "./Pages/StudentPages/SAssignment/SAssignment";
import SGrades from "./Pages/StudentPages/SGrades/SGrades";
import SProfile from "./Pages/StudentPages/SProfile/SProfile";
import SQuizzes from "./Pages/StudentPages/SQuizzes/SQuizzes";
import SSubject from "./Pages/StudentPages/SSubject/SSubject";
import STeachers from "./Pages/StudentPages/STeachers/STeachers";
import Login from "./Pages/Login/Login";
import Enterquizes from "./Pages/TeachersPages/Quizzes/Component/Enterquizes";
import Enrollment from "./Pages/Enrollment/Enrollment";
import Classcontent from "./Pages/TeachersPages/TClasses/ClassContent";
import Chat from "./Pages/Chat/Chat";
import Openwindow from "./Pages/TeachersPages/TDashbord/Openwindow";
import Popupbox from "./Pages/StudentPages/SDashbord/Popupbox.js";
import ComQuises from "./Pages/StudentPages/SQuizzes/ComQuises.js";

   
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState();

  const navigate = useNavigate();

  

// const logoutuser = () => {
//   setUser(null);
//   setIsLoggedIn(false);
//   navigate("/Login");
// };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("MERN_AUTH_TOKEN"));

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 100 > Date.now()) {
        setUser(decodedToken);
        setIsLoggedIn(true);
      }
    } else {
      const currentPath = window.location.pathname;
      if (currentPath !== "/VerifyEmail" && currentPath !== "/Resetpassword") {
        setUser(null);
        setIsLoggedIn(false);
        navigate("/Login");
      }
    }
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abouus" element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Classes" element={<Classes />} />
          <Route
            path="/Login"
            element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/Registrationform" element={<Registrationform />} />
          <Route path="/Assignments" element={<Assignments />} />
          <Route path="/Resetpassword" element={<Resetpassword />} />
          <Route path="/VerifyEmail" element={<VerifyEmail />} />
          <Route path="/TDashbord" element={<TDashbord />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Grades" element={<Grades />} />
          <Route path="/MyAds" element={<MyAds />} />
          <Route path="/PaymentDetails" element={<PaymentDetails />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/TClasses" element={<TClasses />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/SDashbord" element={<SDashbord />} />
          <Route path="/ADashbord" element={<ADashbord />} />
          <Route path="/Aaddresources" element={<Aaddresources />} />
          <Route path="/AADSmanager" element={<AADSmanager />} />
          <Route path="/AAnnouncement" element={<AAnnouncement />} />
          <Route path="/Afeedacks" element={<Afeedacks />} />
          <Route path="/Astudent" element={<Astudent />} />
          <Route path="/Ateacher" element={<Ateacher />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/SAssignment" element={<SAssignment />} />
          <Route path="/SGrades" element={<SGrades />} />
          <Route path="/SProfile" element={<SProfile />} />
          <Route path="/SQuizzes" element={<SQuizzes />} />
          <Route path="/SSubject" element={<SSubject />} />
          <Route path="/STeachers" element={<STeachers />} />
          <Route path="/Enterquizes" element={<Enterquizes />} />
          <Route path="/Enrollment" element={<Enrollment />} />
          <Route path="/Classcontent" element={<Classcontent />} />
          <Route path="/Chat" element={<Chat />}/>
          <Route path="/Openwindow" element={<Openwindow />} />
          <Route path="/Popupbox" element={<Popupbox />} />
          <Route path="/ComQuises" element={<ComQuises />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
