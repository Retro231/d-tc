import "./MockTest.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setTestState } from "../quiz/quizSlice";
import UserProgress from "../../UserProgress";
import { LockIcon } from "@primer/octicons-react";

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
      <div className="single-mock-wrapper" onClick={handleClick}>
        <div className="btn-left">
          <img
            alt="mocktest icon"
            src={`http://appsbreaking.com/category_image/${iconName}`}
          />
          <h3>{title}</h3>
        </div>
        {isLogedin !== null && <UserProgress title={title} />}
        {!isLogedin && (
          <div className="lockBtn" onClick={() => navigate("/pricing")}>
            <LockIcon size={24} />
          </div>
        )}
        {isLogedin && !isSubscribed && id !== 1 && id !== 2 && (
          <div className="lockBtn" onClick={() => navigate("/pricing")}>
            <LockIcon size={24} />
          </div>
        )}
      </div>
    </>
  );
};

export default MockTest;
