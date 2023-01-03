import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedIn({ openMenu }) {
  const navigate = useNavigate();

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLoggedOut() {
    appDispatch({ type: "logout" });
    appDispatch({
      type: "flashMessage",
      value: "You have successfully logged out"
    });
    navigate("/");
    openMenu();
  }
  return (
    <>
      <li onClick={openMenu}>
        <Link to={`/Profile/${appState.user.username}`}>My Tasks</Link>
      </li>
      <li>
        <button onClick={handleLoggedOut} className="btn">
          Log out
        </button>
      </li>
    </>
  );
}

export default HeaderLoggedIn;
