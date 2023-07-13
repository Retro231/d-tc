import React from "react";
import CategoryList from "./CategoryList";

const Categories = () => {
  return (
    <div className="categories-wrapper" id="categories">
      <h2 className="title">Categories</h2>
      <CategoryList />
    </div>
  );
};

export default Categories;
