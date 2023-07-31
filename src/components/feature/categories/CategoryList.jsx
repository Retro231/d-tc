import React from "react";
import catergoryList from "../../../api/categoryList";
import Category from "./Category";
const CategoryList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-4 md:mx-8 gap-2">
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
      <Category key={1} id={`video`} title={`Video`} iconName={`videoIcon`} />
    </div>
  );
};

export default CategoryList;
