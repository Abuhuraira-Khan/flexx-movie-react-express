import React,{useState,useContext} from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { SidebarOC } from "../../Context";


const Navbar = () => {

  const navigate = useNavigate();

  const [searchInput,setSearchInput] = useState('');
  const [expandSearch,setExpandSearch] = useState(false);
  const sidebarOC = useContext(SidebarOC);

  return (
    <div id="navbarPage">
      <div style={{height:expandSearch?'110px':'55px'}} id="nav-header">
        <div id="sideMenuBtnOC">
        <button onClick={()=>setExpandSearch(!expandSearch)}><IoSearchOutline color="#bebebe" size={30}/></button>
          <button onClick={()=>sidebarOC.setSidebarOC(!sidebarOC.sidebarOC)}><IoMdMenu color="#bebebe" size={30}/></button>
        </div>
        <div id="header-logo">
          <img onClick={()=>navigate('/')} id="header_logo_image" src="assets/images/flexx movie logo transparent v-2.png" alt="" />
        </div>
        {/* serach */}
        <div id="navbar-menu">
          <div className="search-container">
            <input
              onChange={(e)=>{setSearchInput(e.target.value)}}
              onKeyDown={(e)=>{searchInput && e.key==='Enter'?navigate(`/search?q=${searchInput}`):null}}
              type="text"
              className="search-input"
              placeholder="Search for movies, TV shows, genres..."
            />
            <div onClick={()=>{searchInput?navigate(`/search?q=${searchInput}`):null}} className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          {/* login */}
          {/* <div id="sign-in-btn">
            <button id="sign-button">sign in</button>
          </div> */}
          {/* contact */}
          <div onClick={()=>navigate('/contact-us')} id="contact-us">
            <p>report or contact us</p>
            <button id="contact-button">contact us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
