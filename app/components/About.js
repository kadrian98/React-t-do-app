import React, { useEffect } from "react";
import Page from "./Page";
import { Logo } from "./style/formik.style";

function About() {
  return (
    <Page title="About">
      <main>
        <section className="about-container">
          <h1 className="header-about">We offer you:</h1>
          <div className="about-content">
            <div className="offer-container">
              Private account
              <Logo src="logo.png" alt="" />
            </div>
            <div className="offer-container">
              Functionaly to-do list
              <img src="/logo.png" alt="" />
            </div>
            <div className="offer-container">
              React solution
              <img src="./logo.png" alt="" />
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

export default About;
