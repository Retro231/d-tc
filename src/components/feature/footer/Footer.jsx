import React from "react";
import { HashLink } from "react-router-hash-link";
const Footer = () => {
  const menuList = [
    {
      title: "Home",
      path: "/#",
    },
    {
      title: "Mock Test",
      path: "/#mock",
    },
    {
      title: "Practice",
      path: "/#categories",
    },
    {
      title: "Pricing",
      path: "/pricing",
    },
    {
      title: "Help",
      path: "/#footer",
    },
  ];
  return (
    <>
      <div
        className="bg-slate-900 mt-[100px] px-4 md:px-8 text-slate-400"
        id="footer"
      >
        <div className="flex flex-col md:flex-row gap-4  justify-around pt-[50px] pb-[50px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm">Quick links</h2>
            {menuList.map((item, index) => (
              <HashLink
                key={index}
                className="hover:text-amber-600 ease-in duration-500"
                to={`${item.path}`}
                smooth
              >
                {item.title}
              </HashLink>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-sm">Contact Us</h5>
            <a
              className="hover:text-amber-600 ease-in duration-500"
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=retrosoftltd@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              retrosoftltd@gmail.com
            </a>
          </div>
        </div>
        <div className="lg:w-[60%] mx-auto sm:text-center p-1 lg:p-4">
          <p>
            Crown Copyright material reproduced under licence from the DVSA
            (Driver and Vehicle Standards Agency) which does not accept any
            responsibility for the accuracy of the reproduction.
          </p>
          <p className="sm:text-center">
            © by RetroSoft LTD. All Right Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
