import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section id="footer">
      Copyright &copy; 2022{" "}
      <Link className="footerLink" to="https://github.com/kadrian98">
        Adrian Kaczmarek
      </Link>
      . All rights reserved
    </section>
  );
}

export default Footer;
