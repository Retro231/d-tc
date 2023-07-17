import React, { useState } from "react";

const Accordion = ({ ques, content }) => {
  return (
    <>
      <div className="collapse collapse-plus rounded-md bg-slate-900 mb-1 text-slate-400">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-[20px] font-medium">{ques}</div>
        <div className="collapse-content bg-slate-800">
          <div className="pt-2">{content}</div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
