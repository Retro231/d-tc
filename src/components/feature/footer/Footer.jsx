import "./Footer.css";
import React from "react";
import { HashLink } from "react-router-hash-link";
const Footer = () => {
  return (
    <>
      <hr className="footer-hr"></hr>
      <div className="footer pb-20" id="footer">
        <div className="footer-left">
          <h5>Quick links</h5>
          <HashLink to="/#" smooth>
            Home
          </HashLink>

          <HashLink to="/#mock" smooth>
            Mock Tests
          </HashLink>

          <HashLink to="/#categories" smooth>
            Practice
          </HashLink>
          <HashLink to="/#faq" smooth>
            FAQ
          </HashLink>
        </div>
        <div className="footer-right">
          <h5>Contact Us</h5>
          <a
            href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=retrosoftltd@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            retrosoftltd@gmail.com
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          Crown Copyright material reproduced under licence from the DVSA
          (Driver and Vehicle Standards Agency) which does not accept any
          responsibility for the accuracy of the reproduction.
        </p>
        <p className="text-center">© by RetroSoft LTD.All Right Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
