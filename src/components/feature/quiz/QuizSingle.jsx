import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions } from "./quizSlice";
import { LockIcon } from "@primer/octicons-react";

const QuizSingle = ({ title, questions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogedin = useSelector((state) => state.auth.value.isLogedin);
  console.log(isLogedin);
  const handleClick = () => {
    if (isLogedin) {
      dispatch(setQuestions(questions));
      navigate("/quizmenu", { state: { title } });
    }
  };
  return (
    <>
      <div onClick={handleClick} className="single-quiz">
        <img src="https://i.ibb.co/MBWMrSf/car.png" alt="car-logo" />
        <h5>{title}</h5>
        {!isLogedin && (
          <span className="lock">
            <LockIcon size={24} />
          </span>
        )}
      </div>
    </>
  );
};

export default QuizSingle;
