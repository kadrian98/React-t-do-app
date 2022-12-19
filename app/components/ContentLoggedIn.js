import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import StateContext from "../StateContext";
import { Button } from "@mui/material";

function ContentLoggedIn() {
  const appState = useContext(StateContext);
  return (
    <Page title="Welcome!">
      <section id="postingSection">
        <h1 className="upper">Hello, {appState.user.username}</h1>
        <Link to="/CreatePost">
          <Button type="submit" variant="contained" color="success">
            Add task
          </Button>
        </Link>
      </section>
    </Page>
  );
}

export default ContentLoggedIn;
