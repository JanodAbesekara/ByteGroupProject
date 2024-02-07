import "./App.css";
import Footer from "./Component/Footer/Footer";
import Navbar from "./Component/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Contactus from "./Pages/Contactus/Contactus";
import Library from "./Pages/Library/Library";
import Classes from "./Pages/Classes/Classes";
import Assignments from "./Pages/TeachersPages/Assignments/Assignments";
import Dashbord from "./Pages/TeachersPages/Dashbord/Dashbord";
import Feedback from "./Pages/TeachersPages/Feedback/Feedback";
import Grades from "./Pages/TeachersPages/Grades/Grades";
import MyAds from "./Pages/TeachersPages/MyAds/MyAds";
import PaymentDetails from "./Pages/TeachersPages/PaymentDetails/PaymentDetails";
import Quizzes from "./Pages/TeachersPages/Quizzes/Quizzes";
import Students from "./Pages/TeachersPages/Students/Students";
import TClasses from "./Pages/TeachersPages/TClasses/TClasses";
import UserProfile from "./Pages/TeachersPages/UserProfile/UserProfile";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abouus" element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Assignments" element={<Assignments />} />
          <Route path="/Dashbord" element={<Dashbord />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Grades" element={<Grades />} />
          <Route path="/MyAds" element={<MyAds />} />
          <Route path="/PaymentDetails" element={<PaymentDetails />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/TClasses" element={<TClasses />} />
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
