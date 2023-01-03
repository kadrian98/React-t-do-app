import React, { useContext, useState } from "react";
import StateContext from "../../StateContext";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "../HeaderLoggedIn";
import HeaderLoggedOut from "../HeaderLoggedOut";
const LINKS = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "About",
    path: "/about"
  }
];

export const Menu = () => {
  const appState = useContext(StateContext);

  const [openClass, setOpenClass] = useState(false);

  function openMenu() {
    setOpenClass(false);
  }

  return (
    <>
      <div
        className="hamburger"
        onClick={() => setOpenClass(prevClass => !prevClass)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-list ${openClass ? "open" : ""}`}>
        {LINKS.map(link => (
          <li key={link.path} onClick={openMenu}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}

        {appState.loggedIn ? (
          <HeaderLoggedIn openMenu={openMenu} />
        ) : (
          <HeaderLoggedOut openMenu={openMenu} />
        )}
      </ul>
    </>
  );
};
