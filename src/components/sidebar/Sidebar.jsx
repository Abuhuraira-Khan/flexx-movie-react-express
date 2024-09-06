import React, { useContext, useEffect, useRef } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { SidebarOC } from "../../Context";

const Sidebar = () => {

  const ocSidebar = useContext(SidebarOC)

  const menuRef = useRef(null)
  

  return (
    <div id="sidebarPage">
      <div ref={menuRef} style={{left:ocSidebar.sidebarOC?'0':'-100%'}} id="menu">
        <Link to={'/'} id="menu-home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
          <span>Home</span>
        </Link>
        <Link to={'/movie'} id="menu-movies">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="movie"
          >
            <g data-name="Layer 2">
              <path d="M27.85,29.06H4.15A3.15,3.15,0,0,1,1,25.91V11.06H31V25.91A3.15,3.15,0,0,1,27.85,29.06ZM3,13.06V25.91a1.15,1.15,0,0,0,1.15,1.15h23.7A1.15,1.15,0,0,0,29,25.91V13.06Z"></path>
              <path d="M31,13.06H1V6.21A3.15,3.15,0,0,1,4.15,3.06h23.7A3.15,3.15,0,0,1,31,6.21Zm-28-2H29V6.21a1.15,1.15,0,0,0-1.15-1.15H4.15A1.15,1.15,0,0,0,3,6.21Z"></path>
              <rect
                width="8.58"
                height="2"
                x="11.87"
                y="7"
                transform="rotate(-71.23 16.153 8)"
              ></rect>
              <rect
                width="8.58"
                height="2"
                x="19.58"
                y="7"
                transform="rotate(-71.24 23.86 8.001)"
              ></rect>
              <rect
                width="8.58"
                height="2"
                x="3.85"
                y="7"
                transform="rotate(-71.23 8.135 8.003)"
              ></rect>
              <path d="M2,12.06V25.91a2.15,2.15,0,0,0,2.15,2.15h23.7A2.15,2.15,0,0,0,30,25.91V12.06Zm17.78,8L14.34,23.6a.11.11,0,0,1-.17-.09v-7a.11.11,0,0,1,.17-.09l5.44,3.51A.11.11,0,0,1,19.78,20.09Z"></path>
            </g>
          </svg>
          <span>Movies</span>
        </Link>
        <Link to={'/kids'} id="menu-kids">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
          <span>Kids</span>
        </Link>
        <Link to={'/drama-series'} id="menu-drama">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M64 64l0 288 512 0 0-288L64 64zM0 64C0 28.7 28.7 0 64 0L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 416c-35.3 0-64-28.7-64-64L0 64zM128 448l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-384 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
          <span>Series & Drama</span>
        </Link>
        <Link to={'/all'} id="menu-all">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>
          <span>All</span>
        </Link>
        <Link to={'/up-coming'} id="menu-upcoming">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
          </svg>
          <span>Up Coming</span>
        </Link>
        {/* <Link to={'/profile'} id="menu-profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
          <br />
          <span>Profile</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
