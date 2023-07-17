import React from "react";
import AppStore from "../../assets/app-store_215x64.svg";
import GooglePlay from "../../assets/google-play_215x64.svg";
import SectionTitle from "../../SectionTitle/SectionTitle";

const GetAppWrapper = () => {
  return (
    <>
      <div className="w-[95%] md:w-[65%] mx-auto" id="getApp">
        <SectionTitle
          title={`Practice offline and on the go with our UK Driving Theory
          Revision 2023 app:`}
        />
      </div>
      <div className="flex flex-col md:flex-row  gap-2 md:gap-4 justify-center items-center">
        {/* <a className="ios" href="#"> */}
        <img className="w-[215px]" src={AppStore} alt="app store" />
        {/* </a> */}
        {/* <a className="android" href="#"> */}
        <img className="w-[215px]" src={GooglePlay} alt="Google Play " />
        {/* </a> */}
      </div>
    </>
  );
  // 215px 64px!important
};

export default GetAppWrapper;
