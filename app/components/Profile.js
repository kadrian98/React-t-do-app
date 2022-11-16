import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import ProfilePosts from "./ProfilePosts";

function Profile() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    isFollowing: false,
    counts: { postCount: "" }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: appState.user.token
        });
        setProfileData(response.data);
      } catch (e) {
        console.log("problem");
      }
    }
    fetchData();
  }, []);

  return (
    <Page title="Profile">
      <ProfilePosts profileData={profileData} setProfileData={setProfileData} />
    </Page>
  );
}

export default Profile;
