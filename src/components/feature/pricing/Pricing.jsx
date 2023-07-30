import React from "react";
import BuyButton from "../payment/BuyButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../SectionTitle/SectionTitle";

const Pricing = () => {
  const navigate = useNavigate();
  const { isLogedin, isSubscribed } = useSelector((state) => state.auth.value);

  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <div className="bg-slate-300 pb-[50px]">
      <div className="w-[70%] md:w-full text-center md:text-left mx-auto">
        <SectionTitle
          title={`Pricing`}
          description={` Unlock all questions with Premium.All 750+ authentic DVSA
              questions.Plus over 800 TopTests exclusives you won't find
              anywhere else.`}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 justify-center">
        <div className="card w-96 bg-base-100 shadow-xl border-spacing-0">
          <div className="card-body items-center text-center">
            <div className="">
              <h2 className="text-lg text-gray-700">Free</h2>
            </div>
            <hr className="bg-slate-900 h-[2px] w-full"></hr>
            <h2 className="text-[2rem] font-semibold">
              £0.00<span className="font-light">/Unlimited</span>
            </h2>
            <ul>
              <li>Free Mock Test</li>
              <li> 2 Mock test </li>
              <li>2 Practice Test </li>
              <li className="line-through">Help center access</li>
            </ul>
            <div>
              <button
                className="px-[87px] py-[8px] font-semibold rounded-md border-2 border-amber-600 hover:border-amber-600 hover:bg-amber-600 ease-in-out duration-500"
                onClick={!isLogedin ? handleSignUp : ""}
              >
                Sign up for free
              </button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl border-spacing-0">
          <div className="card-body items-center text-center">
            <div>
              <h2 className="text-lg text-amber-600">Premium</h2>
            </div>
            <hr className="bg-slate-900 h-[2px] w-full"></hr>
            <h2 className="text-[2rem] font-semibold">
              £3.99<span className="font-light">/Unlimited</span>
            </h2>
            <ul>
              <li>All 750+ DVSA revision questions</li>
              <li>Unlimited Mock Test</li>
              <li>Lifetime access</li>
              <li>Help center access</li>
            </ul>
            <div className="">
              {isSubscribed && (
                <>
                  <button className="px-[102px] py-[8px] font-semibold bg-amber-600 border-2 border-amber-600 rounded-md cursor-not-allowed">
                    Subscribed
                  </button>
                </>
              )}
              {!isLogedin && (
                <>
                  <button
                    className="px-[128px] py-[8px] font-semibold  bg-amber-600 border-2 border-amber-600 rounded-md"
                    onClick={handleSignUp}
                  >
                    Buy
                  </button>
                </>
              )}
              {isLogedin && !isSubscribed && <BuyButton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
