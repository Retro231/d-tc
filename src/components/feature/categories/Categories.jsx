import React from "react";
import CategoryList from "./CategoryList";
import SectionTitle from "../../SectionTitle/SectionTitle";

const Categories = () => {
  return (
    <div id="categories" className="bg-slate-300">
      <SectionTitle
        title={`Categories`}
        description={`Welcome to our mock test and practice platform!Whether you're a learner driver or looking to refresh your understanding, our category-wise practice system allows you to focus on specific areas of interest. Prepare yourself for success by immersing in realistic mock tests that mimic the actual DVSA theory test, ensuring you're well-prepared to tackle any challenge.`}
      ></SectionTitle>
      <CategoryList />
    </div>
  );
};

export default Categories;
