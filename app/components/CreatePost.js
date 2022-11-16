import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        token: appState.user.token
      });
      //redirect to new post url
      appDispatch({
        type: "flashMessage",
        value: "Congrats, you created a new post."
      });
      navigate(`/post/${response.data}`);
      console.log("new post created");
    } catch (e) {
      console.log("problem");
    }
  }
  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <section id="createPostSection">
          <input
            onChange={e => setTitle(e.target.value)}
            autoFocus
            className="postInput"
            type="text"
            placeholder="Title"
            autoComplete="off"
          />
          <input
            onChange={e => setBody(e.target.value)}
            className="postInput"
            type="text"
            placeholder="Description"
            autoComplete="off"
          />
          <button className="postSubmit" type="submit">
            Add
          </button>
        </section>
      </form>
    </Page>
  );
}

export default CreatePost;
