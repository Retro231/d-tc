import "./GetAppWrapper.css";
import React from "react";
import AppStore from "../../assets/app-store_215x64.svg";
import GooglePlay from "../../assets/google-play_215x64.svg";

const GetAppWrapper = () => {
  return (
    <div className="get-app-wrapper" id="getApp">
      <h3>
        Practice offline and on the go with our <br /> UK Driving Theory
        Revision 2023 app:
      </h3>
      <div className="get-app-btn">
        {/* <a className="ios" href="#"> */}
        <img src={AppStore} alt="app store " />
        {/* </a> */}
        {/* <a className="android" href="#"> */}
        <img src={GooglePlay} alt="Google Play " />
        {/* </a> */}
      </div>
    </div>
  );
  // 215px 64px!important
};

export default GetAppWrapper;
