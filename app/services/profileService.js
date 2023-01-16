import Axios from "axios";

export function fetchUserAPI(username, token) {
  try {
    return Axios.post(`/profile/${username}`, {
      token: token
    });
  } catch (e) {
    console.log("problem", e);
  }
}
