import './App.css';
import Footer from './Component/Footer/Footer';
import Navbar from './Component/Navbar/Navbar';
import Login from './Pages/Login/Login';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Aboutus from './Pages/Aboutus/Aboutus';
import Contactus from './Pages/Contactus/Contactus';
import Library from './Pages/Library/Library';
import Classes from './Pages/Classes/Classes';



function App() {
  return (
   <>
   <div>
   <Navbar/>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/abouus' element={<Aboutus />}/>
     <Route path='/Contactus' element={<Contactus/>}/>
     <Route path='/Library' element={<Library/>}/>
     <Route path='/Classes' element={<Classes/>}/>  
     <Route path='/Login'  element={<Login/>}/>
    </Routes>
    <Footer/>
    </div>
   </>
  );
}

export default App;
