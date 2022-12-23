import React, { useEffect, useState, useContext } from "react";
import { useImmerReducer } from "use-immer";
import Page from "./Page";
import { useParams, Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import NotFound from "./NotFound";

function EditPost() {
  const navigate = useNavigate();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const originalState = {
    title: {
      value: "",
      hasErrors: false,
      message: ""
    },
    body: {
      value: "",
      hasErrors: false,
      message: ""
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
    notFound: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case "titleChange":
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        return;
      case "bodyChange":
        draft.body.hasErrors = false;
        draft.body.value = action.value;
        return;
      case "submitRequest":
        if (!draft.title.hasErrors && !draft.body.hasErrors) {
          draft.sendCount++;
        }
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case "titleRules":
        if (!action.value.trim()) {
          draft.title.hasErrors = true;
          draft.title.message = "You must provide title";
        }
        return;
      case "bodyRules":
        if (!action.value.trim()) {
          draft.body.hasErrors = true;
          draft.body.message = "You must provide description";
        }
        return;
      case "notFound":
        draft.notFound = true;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({ type: "titleRules", value: state.title.value });
    dispatch({ type: "bodyRules", value: state.body.value });
    dispatch({ type: "submitRequest" });
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, {
          cancelToken: ourRequest.token
        });
        if (response.data) {
          dispatch({ type: "fetchComplete", value: response.data });
          if (appState.user.username != response.data.author.username) {
            appDispatch({
              type: "flashMessage",
              value: "You dont have a permission to edit that post."
            });
            navigate("/");
          }
        } else {
          dispatch({ type: "notFound" });
        }
      } catch (e) {
        console.log("There was a problem or the request was cancelled.");
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });
      const ourRequest = Axios.CancelToken.source();
      async function fetchPost() {
        try {
          const response = await Axios.post(
            `/post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: appState.user.token
            },
            { cancelToken: ourRequest.token }
          );
          dispatch({ type: "saveRequestFinished" });
          appDispatch({ type: "flashMessage", value: "Post was updated." });
          navigate(`/post/${state.id}`);
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchPost();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  if (state.notFound) {
    return <NotFound />;
  }

  if (state.isFetching) return <Page title="...">Loading...</Page>;

  return (
    <Page title="Edit Post">
      <Link to={`/post/${state.id}`}>&laquo; Back to post permalink</Link>
      <form onSubmit={submitHandler}>
        <section id="createPostSection">
          {state.title.hasErrors && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.title.message}
            </div>
          )}
          <input
            onChange={e =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
            onBlur={e =>
              dispatch({ type: "titleRules", value: e.target.value })
            }
            value={state.title.value}
            autoFocus
            className="postInput"
            type="text"
            placeholder="Title"
            autoComplete="off"
          />
          {state.body.hasErrors && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.body.message}
            </div>
          )}
          <input
            onChange={e =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
            onBlur={e => dispatch({ type: "bodyRules", value: e.target.value })}
            className="postInput"
            type="text"
            placeholder="Description"
            autoComplete="off"
            value={state.body.value}
          />
          <button
            disabled={state.isSaving}
            className="postSubmit"
            type="submit"
          >
            Accept
          </button>
        </section>
      </form>
    </Page>
  );
}

export default EditPost;
