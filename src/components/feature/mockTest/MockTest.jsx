import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setTestState } from "../quiz/quizSlice";
import UserProgress from "../../UserProgress/UserProgress";
import { LockClosedIcon } from "@heroicons/react/24/solid";
const MockTest = ({ id, title, iconName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogedin, isSubscribed } = useSelector((state) => state.auth.value);
  const questionsDB = useSelector((state) => state.db.value.questionsDB);

  const handleClick = () => {
    const questions = questionsDB;
    const randomQuestions = [];

    while (randomQuestions.length < Math.min(50, questions.length)) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (!randomQuestions.includes(questions[randomIndex])) {
        randomQuestions.push(questions[randomIndex]);
      }
    }
    if (isLogedin) {
      dispatch(setQuestions(randomQuestions));
      dispatch(setTestState("mock"));
      console.log(randomQuestions);
      navigate("/quizmenu", { state: { title } });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="relative group flex flex-col items-center outline outline-1 outline-amber-300 p-8 hover:outline-sky-900 ease-in duration-500 bg-gray-300">
        <div className="flex flex-col items-center">
          <img
            className="w-[50px]"
            alt="mocktest icon"
            src={`http://appsbreaking.com/category_image/${iconName}`}
          />
          <span className="my-2 font-extrabold text-sm text-amber-700 group-hover:text-sky-800  ease-in duration-500 text-center">
            {title}
          </span>
        </div>
        <div
          className="absolute top-0 w-full h-full bg-transparent"
          onClick={handleClick}
        ></div>
        {isLogedin && <UserProgress title={title} />}
        {!isLogedin && (
          <div
            className="absolute top-0 w-full h-full bg-gray-800 bg-opacity-40 p-4"
            onClick={() => navigate("/pricing")}
          >
            <span className="flex items-center gap-1">
              <LockClosedIcon className="w-[30px] h-auto text-red-700 "></LockClosedIcon>
              <span className="font-semibold opacity-0 group-hover:opacity-100 ease-in duration-500 text-red-700">
                Click to Unlock
              </span>
            </span>
          </div>
        )}
        {isLogedin && !isSubscribed && id !== 1 && id !== 2 && (
          <div
            className="absolute group top-0 w-full h-full bg-gray-800 bg-opacity-40 p-4 "
            onClick={() => navigate("/pricing")}
          >
            <span className="flex items-center gap-1 ">
              <LockClosedIcon className="w-[30px] h-auto text-red-700 "></LockClosedIcon>
              <span className="font-semibold opacity-0 group-hover:opacity-100 ease-in duration-500 text-red-700">
                Click to Unlock
              </span>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MockTest;
