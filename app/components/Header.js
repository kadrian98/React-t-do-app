import React, { useStatez, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";
import StateContext from "../StateContext";

function Header(props) {
  const appState = useContext(StateContext);

  return (
    <nav>
      <div className="container nav-wrapper">
        <div className="brand">
          <span className="material-symbols-outlined"> rocket_launch </span>
          <span>
            <strong>TO-DO REACT</strong>
          </span>
        </div>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
