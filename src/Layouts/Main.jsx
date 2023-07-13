import React from "react";
import Header from "../components/feature/Header/Header";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/feature/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import MobileHeader from "../components/feature/MobileHeader/MobileHeader";

const Main = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div id="#">
      {isBigScreen && <Header />}
      {isTabletOrMobile && <MobileHeader />}
      <Outlet></Outlet>
      <Footer />
      <ScrollToTop smooth />
    </div>
  );
};

export default Main;
