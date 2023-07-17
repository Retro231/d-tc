import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetQuiz } from "./quizSlice";
import { useDispatch, useSelector } from "react-redux";

const QuizMenu = () => {
  <Navigate to="/quizmenu" />;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const questions = useSelector((state) => state.quiz.value.questions);
  const testState = useSelector((state) => state.quiz.value.testState);
  const handleClick = () => {
    navigate("/showQuiz", { state: { title: location.state.title } });
  };
  useEffect(() => {
    dispatch(resetQuiz());
  });
  return (
    <div className="w-full h-screen bg-slate-900">
      <div className="card w-[300px] md:w-96 bg-slate-100 shadow-2xl  fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div className="flex flex-col text-center gap-2 md:gap-4 p-4 font-semibold text-slate-700">
          <div className="">
            <h2 className="text-mid text-amber-600">{location.state.title}</h2>
          </div>
          <div className="flex flex-row justify-center gap-2 md:gap-4 text-[15px] tracking-tight md:tracking-normal">
            <div className="flex flex-col text-start gap-1 md:gap-2">
              <h4>Number Of questions</h4>
              <h4>Pass Mark</h4>
              <h4>Time Limit</h4>
            </div>
            <div className="flex flex-col text-start gap-2">
              <h4>{questions.length}</h4>
              {testState === "practice" ? <h4>None</h4> : <h4>43 out of 50</h4>}
              {testState === "practice" ? <h4>None</h4> : <h4>57 minutes</h4>}
            </div>
          </div>

          <span
            className="btn bg-green-600  text-white hover:bg-green-700 tracking-wider"
            onClick={handleClick}
          >
            Begin Test
          </span>
        </div>
        {/* <h2>{location.state.title}</h2>
      {!location.state.description ? (
        <p>
          You have 57 minutes to answer 50 multiple choice driving theory test
          questions. At least 43 out of 50 questions must be answered correctly
          in order to pass the test. Answers may be reviewed after each question
          or you can wait until the end of the test for your final score. Good
          luck!
        </p>
      ) : (
        <p>{location.state.description}</p>
      )}
      <p></p>
      <Button onClick={handleClick} variant="warning">
        Begin Test
      </Button> */}
      </div>
    </div>
  );
};

export default QuizMenu;
