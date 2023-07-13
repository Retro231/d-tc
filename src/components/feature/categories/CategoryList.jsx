import React from "react";
import catergoryList from "../../../api/categoryList";
import Category from "./Category";
const CategoryList = () => {
  return (
    <div className="category-list">
      {catergoryList.map((item, index) => {
        return (
          <Category
            key={index}
            id={item.id}
            title={item.title}
            iconName={item.iconName}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
