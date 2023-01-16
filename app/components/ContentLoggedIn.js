import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import StateContext from "../StateContext";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectProfilePostCount } from "../stores/userProfileSlice";

function ContentLoggedIn() {
  const appState = useContext(StateContext);
  const postCount = useSelector(selectProfilePostCount);

  return (
    <Page title="Welcome!">
      <section id="postingSection">
        <h1 className="upper">Hello, {appState.user.username}</h1>
        <h2 className="tasksAmount">{`${
          postCount > 4
            ? `Hurry up! You have: ${postCount} tasks to do.`
            : `Amount of tasks: ${postCount}`
        }`}</h2>
        <Link to="/CreatePost">
          <Button
            onClick={() => dispatch(addUser())}
            type="submit"
            variant="contained"
            color="success"
          >
            Add task
          </Button>
        </Link>
      </section>
    </Page>
  );
}

export default ContentLoggedIn;
