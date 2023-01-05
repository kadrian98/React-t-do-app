import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const handleDateChange = date => {
    console.log(date);
    setSelectedDate(date);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (title && body) {
      try {
        const response = await Axios.post("/create-post", {
          title,
          body,
          selectedDate,
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
    } else {
      appDispatch({
        type: "errorMessage",
        value: "You have to fill up all inputs"
      });
    }
  }
  return (
    <Page title="Create Post">
      <h1 className="formHeader">Type down your to do event!</h1>
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

function printDate(date) {
  const parsedDate = new Date(date);
  return `${parsedDate.getDate()}/${parsedDate.getMonth()}/${parsedDate.getFullYear()}`;
}
