import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProfilePosts(props) {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/Profile/${username}/posts`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("Problem");
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list-group">
      {props.profileData.counts.postCount}
      {posts.map(post => {
        const date = new Date(post.createdDate);
        const dateFromatted = `${
          date.getMonth() + 1
        }/ ${date.getDate()}/${date.getFullYear()}`;
        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small"> on {dateFromatted} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
