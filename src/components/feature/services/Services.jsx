import React from "react";
import { BoltIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import SectionTitle from "../../SectionTitle/SectionTitle";

const services = [
  {
    id: 1,
    logo: <BoltIcon className="h-6 w-6 text-amber-500"></BoltIcon>,
    title: "Latest Theory Questions",
    description:
      "Study from a bank of 2500+ DVSA theory test revision questions, up-to-date for 2023. Take full-length tests and track your progress.",
  },
  {
    id: 2,
    logo: <RocketLaunchIcon className="h-6 w-6 text-amber-500" />,
    title: "Mobile & Tablet Ready",
    description:
      "Access the learning material anywhere using your PC, Mac, phone or tablet. Practice on any of these devices at any time and as much as you like!",
  },
];
const Services = () => {
  return (
    <div id="services" className="bg-slate-300">
      <SectionTitle title={"You'll Get.."}></SectionTitle>
      <div className="w-[95%] sm:w-[90%] lg:w-[75%] grid grid-cols-1 md:grid-cols-2  gap-3 mx-auto py-[30px]">
        {services.map((service, index) => (
          <div
            className="group flex flex-col gap-3 px-8 py-8 rounded-sm bg-[#0e1826] outline outline-blue-950 hover:bg-slate-800 transition-all ease-linear duration-800 drop-shadow-2xl"
            key={index}
          >
            <h1 className="text-sm text-amber-400 flex gap-1">
              <span> {service.logo}</span>
              {service.title}
            </h1>
            <p className="text-white">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
