import "./MockTest.css";
import React from "react";

import MockTestList from "./MockTestList";

const MockTestWrapper = () => {
  return (
    <div className="mock-test-wrapper" id="mock">
      <h2 className="title">Mock Test</h2>
      <MockTestList />
    </div>
  );
};

export default MockTestWrapper;
