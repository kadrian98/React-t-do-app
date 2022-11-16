import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", {
        username,
        password
      });
      if (response.data) {
        appDispatch({ type: "login", data: response.data });
        appDispatch({
          type: "flashMessage",
          value: "You have sucesfully logged in"
        });
      } else {
        console.log("incorrect username/password");
        appDispatch({
          type: "flashMessage",
          value: "Invalid username / password"
        });
      }
    } catch (e) {
      console.log("there was a problem");
    }
  }

  return (
    <li>
      <button className="btn">Login</button>
      <ul className="dropdown-list">
        <form onSubmit={handleSubmit} id="login-form">
          <input
            onChange={e => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="firstname"
            placeholder="Login.."
          />

          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            placeholder="Password.."
          />

          <input type="submit" value="Sign in" />
        </form>
      </ul>
    </li>
  );
}

export default HeaderLoggedOut;
