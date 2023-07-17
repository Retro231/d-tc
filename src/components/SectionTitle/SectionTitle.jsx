import React from "react";

const SectionTitle = ({ title, description }) => {
  return (
    <>
      <h2 className="w-full text-center text-lg md:text-xl pt-[100px] pb-4 text-sky-950">
        {title}
      </h2>
      {description !== undefined && (
        <p className="w-[95%] md:w-[700px] mx-auto  md:text-center pb-10 text-sky-900 font-semibold">
          {description}
        </p>
      )}
    </>
  );
};

export default SectionTitle;
