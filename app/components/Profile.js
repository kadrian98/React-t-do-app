import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import MyTasks from "./MyTasks";
import { fetchUserAPI } from "../services/profileService";
import { useDispatch } from "react-redux";
import { userProfileSlice } from "../stores/userProfileSlice";

function Profile() {
  useFetchProfileData();

  return (
    <Page title="Profile">
      <MyTasks />
    </Page>
  );
}

export default Profile;

function useFetchProfileData() {
  const { username } = useParams();
  const appState = useContext(StateContext);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // Fetch data from API
      const response = await fetchUserAPI(username, appState.user.token);
      // save data to store
      dispatch(userProfileSlice.actions.setUserProfile(response.data));
    }
    fetchData();
  }, [appState]);
}
