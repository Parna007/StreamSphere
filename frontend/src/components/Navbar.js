import logo from "../assests/logo.png";
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

function Navbar() {
  return (
   <div className="nav">
     <div className="navImg">
        <img src={logo} alt="Icon" className="logo"/>
     </div>
     <div className="navLink">
        <h2><Link to="/" className="heading">Home</Link></h2>
        <h2><Link to="/myList" className="heading">My List</Link></h2>
     </div>
   </div>
  );
}

export default Navbar;