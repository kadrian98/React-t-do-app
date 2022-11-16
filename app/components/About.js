import React, { useEffect } from "react";
import Page from "./Page";

function About() {
  return (
    <Page title="About">
      <main>
        <section className="header container">
          <h1>We offer you:</h1>
          <div className="content-container">
            <div className="offer-container">
              Your private account
              <img src="/logo.png" alt="" />
            </div>
            <div className="offer-container">
              Functionaly to-do list
              <img src="/logo.png" alt="" />
            </div>
            <div className="offer-container">
              The newest technology based on React
              <img src="./logo.png" alt="" />
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

export default About;
