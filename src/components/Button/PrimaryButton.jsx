import React from "react";

const PrimaryButton = ({ text, handleClick }) => {
  return (
    <button className="btn bg-amber-400 hover:bg-amber-700 text-gray-800  hover:text-white ease-in-out duration-1000">
      {text}
    </button>
  );
};

export default PrimaryButton;
