import React from "react";
import mockTestList from "./../../../api/mockTestList";
import MockTest from "./MockTest";
const MockTestList = () => {
  return (
    <div className="mock-test-list">
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
