import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section id="footer">
      Copyright &copy; 2022{" "}
      <a
        className="footerLink"
        href="https://github.com/kadrian98"
        target="_blank"
      >
        Adrian Kaczmarek
      </a>
      . All rights reserved
    </section>
  );
}

export default Footer;
