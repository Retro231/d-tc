import React from "react";
import Categories from "../feature/categories/Categories";
import Hero from "../feature/Hero/Hero";
import Services from "../feature/services/Services";
import MockTestWrapper from "../feature/mockTest/MockTestWrapper";
import GetAppWrapper from "../feature/getApp/GetAppWrapper";
import FAQ from "../feature/faq/FAQ";
const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Categories />
      <MockTestWrapper />
      <GetAppWrapper />
      <FAQ />
    </div>
  );
};

export default Home;
