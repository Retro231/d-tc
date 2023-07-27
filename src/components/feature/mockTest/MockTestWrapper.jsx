import React from "react";

import MockTestList from "./MockTestList";
import SectionTitle from "../../SectionTitle/SectionTitle";

const MockTestWrapper = () => {
  return (
    <div id="mock" className="bg-slate-300">
      <SectionTitle
        title={"MockTest"}
        description={`Our mock tests are designed to help you practice and improve. With our user-friendly interface, you can simulate the real DVSA theory test experience and assess your readiness. Our question bank covers various topics, ensuring comprehensive coverage of the exam curriculum. Gain confidence, identify areas for improvement, and enhance your chances of passing the DVSA theory test with flying colors. Start practicing today and pave the way to becoming a confident and informed driver!`}
      ></SectionTitle>
      <MockTestList />
    </div>
  );
};

export default MockTestWrapper;
