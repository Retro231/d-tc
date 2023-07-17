import React from "react";

const PrimaryButtonOutline = ({ text, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="btn text-white hover:bg-amber-400 hover:text-gray-800 px-5 py-4 ease-in-out duration-1000 font-bold rounded-md"
    >
      {text}
    </button>
  );
};

export default PrimaryButtonOutline;
