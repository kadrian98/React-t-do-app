import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";

function Header(props) {
  return (
    <nav>
      <div className="container nav-wrapper">
        <Link to="/" className="brand">
          <span className="material-symbols-outlined"> rocket_launch </span>
          <span>
            <strong>TO-DO REACT!</strong>
          </span>
        </Link>
        <Menu />
      </div>
    </nav>
  );
}

export default Header;
