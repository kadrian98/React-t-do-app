import Axios from "axios";

export function getUserPosts(username) {
  return Axios.get(`/Profile/${username}/posts`);
}
