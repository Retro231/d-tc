import React from "react";
import mockTestList from "./../../../api/mockTestList";
import MockTest from "./MockTest";
const MockTestList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-4 md:mx-8 gap-2">
      {mockTestList.map((item, index) => {
        return (
          <MockTest
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

export default MockTestList;
