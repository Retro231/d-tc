import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setTestState } from "../quiz/quizSlice";
import PrimaryButton from "../../Button/PrimaryButton";
import PrimaryButtonOutline from "../../Button/PrimaryButtonOutline";
import { HashLink } from "react-router-hash-link";
const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsDB = useSelector((state) => state.db.value.questionsDB);
  const { isLogedin } = useSelector((state) => state.auth.value);
  const demoSet = questionsDB.slice(0, 50);
  const handleDemoBtn = () => {
    console.log("clicked");
    dispatch(setQuestions(demoSet));
    dispatch(setTestState("freeTest"));
    navigate("/quizmenu", {
      state: {
        title: "Free Mock Test",
        description:
          "This is a demo quiz to understant about our quiz exam system. You have 57 minutes to answer 50 multiple choice driving theory test     questions. At least 43 out of 50 questions must be answered correctly in order to pass the test. Answers may be reviewed after each question or you can wait until the end of the test for your final score. Good luck!",
      },
    });
  };
  return (
    <>
      <div
        className="w-full h-[600px] pt-[170.14px] pb-[100px] text-black text-start sm:text-center
       bg-hero1 bg-no-repeat bg-cover bg-bottom relative"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-80 z-0"></div>
        <section className="w-[90%] lg:w-[70%] absolute left-0 right-0 my-0 mx-auto z-10">
          <h2 className="text-lg sm:text-1xl text-slate-100">
            Welcome to UK Driving Theory Revision 2023
          </h2>
          <p className="md:font-bold mt-4 text-slate-200 mx-auto lg:w-[650px]">
            With our extensive collection of over 2500 DVSA theory test revision
            questions, all up-to-date for 2023, you can sharpen your driving
            knowledge and skills with ease. Let's embark on your journey towards
            becoming a knowledgeable and skilled driver!
          </p>
          <section className="mt-10 flex sm:justify-center gap-3">
            <HashLink to={isLogedin ? "/#categories" : "/pricing"} smooth>
              <PrimaryButton text="Start learning"></PrimaryButton>
            </HashLink>
            <PrimaryButtonOutline
              text="Free Mock Test"
              handleClick={handleDemoBtn}
            ></PrimaryButtonOutline>
          </section>
        </section>
      </div>
    </>
  );
};

export default Hero;
