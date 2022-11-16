import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Page title="Not found">
      <div className="text-center">
        <h2>Cant find</h2>
        <p className="lead text-muted">
          {" "}
          you can alwasy visit <Link to="/">homepage</Link>
        </p>
      </div>
    </Page>
  );
}

export default NotFound;
