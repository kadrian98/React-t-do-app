import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

function Home() {
  return (
    <Page title="Welcome!">
      <section id="postingSection">
        <h1 className="upper">
          Hello, {localStorage.getItem("TodoAppUsername")}
        </h1>
        <Link to="/CreatePost">
          <button type="submit">Add task</button>
        </Link>
      </section>
    </Page>
  );
}

export default Home;
