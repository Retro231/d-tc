import "./Pricing.css";
import React from "react";
import BuyButton from "../payment/BuyButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const { isLogedin, isSubscribed } = useSelector((state) => state.auth.value);

  console.log(isSubscribed);

  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="pt-50 " id="pricing"></div>
      <div className="pricing-wrapper pb-50">
        <div className="pricing-title text-center pb-30">
          <h2 className="pb-10">Pricing</h2>
          <p>
            Unlock all questions with Premium.All 750+ authentic DVSA questions.
            <br></br>
            Plus over 800 TopTests exclusives you won't find anywhere else.
          </p>
        </div>
        <div className="pricing-card">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Free</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $0<small className="text-body-secondary fw-light">/mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Free Mock Test</li>
                <li>2 Mock test</li>
                <li>2 Practice Test</li>
                <li>
                  <del>Help center access</del>
                </li>
              </ul>
              {!isLogedin && (
                <button
                  type="button"
                  className="freePriceingBtn"
                  onClick={handleSignUp}
                >
                  Sign up for free
                </button>
              )}
              {isLogedin && (
                <button type="button" className="freePriceingBtn" disabled={``}>
                  Sign up for free
                </button>
              )}
            </div>
          </div>
          <div className="card h-[60px] mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3 bg-warning">
              <h4 className="my-0 fw-normal">Premium</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $4.99
                <small className="text-body-secondary fw-light">/mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>All 750+ DVSA revision questions</li>
                <li>New DVSA video case studies</li>
                <li>Theory Exam Simulator</li>
                <li>Help center access</li>
              </ul>
              {isSubscribed && (
                <button
                  type="button"
                  className="freePriceingBtn premiumBtn"
                  disabled
                >
                  Subscribed
                </button>
              )}
              {!isLogedin && (
                <button
                  type="button"
                  className="freePriceingBtn premiumBtn"
                  onClick={handleSignUp}
                >
                  Subscribe
                </button>
              )}
              {isLogedin && !isSubscribed && <BuyButton />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
