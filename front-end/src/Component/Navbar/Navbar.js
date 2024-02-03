import { useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import "./NavBar.css";

export default function Navbar() {
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <img
        src="./logos/logo.png"
        className="im1"
        alt="This is a logo about Dream Learn Academy"
      />
      <nav ref={navRef}>
        <Link to="/">Home</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/library">Library</Link>
        <Link to="/abouus">About US</Link>
        <Link to="/contactus" className="con">
          Contact US
        </Link>
        <Link to="/login" className="log">
          Login
        </Link>
      </nav>
      <button onClick={showNavBar} className="nav-btn">
        <FaBars />
      </button>
    </header>
  );
}
