import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setTestState } from "../quiz/quizSlice";
import UserProgress from "../../UserProgress/UserProgress";
import { LockClosedIcon } from "@heroicons/react/24/solid";
const Category = ({ id, title, iconName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsDB = useSelector((state) => state.db.value.questionsDB);
  const { isLogedin, isSubscribed } = useSelector((state) => state.auth.value);

  const handleClick = () => {
    const categoryId = id;
    console.log(categoryId);
    const categoryQuestion = questionsDB.filter((item) => {
      if (categoryId !== 0) {
        return item.category === categoryId;
      } else {
        return item.category !== categoryId;
      }
    });

    if (isLogedin) {
      dispatch(setQuestions(categoryQuestion));
      dispatch(setTestState("practice"));
      console.log(categoryQuestion);
      navigate("/quizmenu", { state: { title } });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="relative group flex flex-col items-center outline outline-1 outline-amber-300 p-8 hover:outline-sky-900 ease-in duration-500 bg-gray-300">
        <div className="flex flex-col items-center ">
          <img
            className="w-[50px]"
            alt="category icon"
            src={`http://appsbreaking.com/category_image/${iconName}`}
          />
          <span className="my-2 font-extrabold text-sm text-amber-700 group-hover:text-sky-800 ease-in duration-500 text-center">
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
      </div>
    </>
  );
};

export default Category;
