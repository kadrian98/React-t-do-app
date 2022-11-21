import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

// My Components
import Header from "./components/Header";
import Content from "./components/Content";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";
import Profile from "./components/Profile";
import EditPost from "./components/EditPost";
import NotFound from "./components/NotFound";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import TestForm from "./components/TestForm";

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("TodoAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("TodoAppToken"),
      username: localStorage.getItem("TodoAppUsername"),
      avatar: localStorage.getItem("TodoAppAvatar")
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("TodoAppToken", state.user.token);
      localStorage.setItem("TodoAppUsername", state.user.username);
      localStorage.setItem("TodoAppAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("TodoAppToken");
      localStorage.removeItem("TodoAppUsername");
      localStorage.removeItem("TodoAppAvatar");
    }
  }, [state.loggedIn]);

  // Check if token has expired or not on first render

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post(
            "/checkToken",
            { token: state.user.token },
            { cancelToken: ourRequest.token }
          );
          if (!response.data) {
            dispatch({ type: "logout" });
            dispatch({
              type: "flashMessage",
              value: "Your session has expired. please log in again."
            });
          }
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/Profile/:username/*" element={<Profile />} />
            <Route path="/" element={state.loggedIn ? <Home /> : <Content />} />
            <Route path="/test" element={<RegisterForm />} />
            <Route path="/Post/:id" element={<ViewSinglePost />} />
            <Route path="/Post/:id/edit" element={<EditPost />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/About" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/TestForm" element={<TestForm />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
