import React, { useEffect, useState } from "react";
import Header from "../components/feature/Header/Header";
import Footer from "../components/feature/footer/Footer";
import { Outlet } from "react-router-dom";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const Main = () => {
  const [scrollTop, setScrollTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 340) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);
  const bottomToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div id="#">
      <Header />
      <Outlet></Outlet>
      <Footer />
      {scrollTop && (
        <div className="right-1 md:right-6 bottom-8 z-50 fixed">
          <ArrowUpCircleIcon
            className="text-amber-600 w-[45px] h-[45px] bg-slate-900 rounded-full cursor-pointer"
            onClick={bottomToTop}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
