import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";
import StateContext from "../StateContext";
import "../menu.js";

function Header(props) {
  const appState = useContext(StateContext);

  return (
    <nav>
      <div className="container nav-wrapper">
        <Link to="/" className="brand">
          <span className="material-symbols-outlined"> rocket_launch </span>
          <span>
            <strong>TO-DO REACT</strong>
          </span>
        </Link>
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
