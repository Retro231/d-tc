import "./Services.css";
import React from "react";
import {
  CheckCircleFillIcon,
  // AlertFillIcon,
  FeedRocketIcon,
} from "@primer/octicons-react";

const services = [
  {
    id: 1,
    logo: <CheckCircleFillIcon size={24} fill="#02b531" />,
    title: "Latest Theory Questions",
    description:
      "Study from a bank of 2500+ DVSA theory test revision questions, up-to-date for 2023. Take full-length tests and track your progress.",
  },
  // {
  //   id: 2,
  //   logo: <AlertFillIcon size={24} fill="#f00" />,
  //   title: "Interactive Hazard Perception Clips",
  //   description:
  //     "Practice from 250+ CGI and HD interactive hazard perception video clips, the highest number of practice clips available anywhere!",
  // },
  {
    id: 3,
    logo: <FeedRocketIcon size={24} fill="#ffa501" />,
    title: "Mobile & Tablet Ready",
    description:
      "Access the learning material anywhere using your PC, Mac, phone or tablet. Practice on any of these devices at any time and as much as you like!",
  },
];
const Services = () => {
  return (
    <>
      <div className="service">
        {services.map((service, index) => (
          <div className="single-service text-center" key={index}>
            {service.logo}
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Services;
