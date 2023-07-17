// import questionCircleIcon from "./../../assets/question-circle-fill.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ReactPlayer from "react-player";
import { next, prev, setRegAns, resetQuiz } from "./quizSlice";
import { useNavigate } from "react-router-dom";
const initialTime = {
  min: 50,
  sec: 0,
};

const Quiz = ({ title }) => {
  const [checked, setChecked] = useState("");
  const [time, setTime] = useState(initialTime);
  const [progressCount, setProgressCount] = useState(0);
  // variable and redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const title = location.state.title;
  const state = useSelector((state) => state.quiz.value);
  const { testState, questions, currentIndex, regAns } = state;
  const { question, answers, correctAnswer, mediaType, content } =
    questions[currentIndex];

  const percentagePerQuestion = (1 / questions.length) * 100;
  // handle submit
  const handleSubmit = () => {
    navigate("/quizResult", {
      state: { title: title },
      replace: true,
    });
  };
  // handle quit
  const handleQuit = () => {
    setChecked("");
    setProgressCount(0);
    dispatch(resetQuiz());
    navigate("/", { replace: true });
  };

  // timer
  let timerInterval;
  useEffect(() => {
    const updateCountDown = () => {
      let seconds = time.sec;
      let minutes = time.min;

      if (minutes <= 0 && seconds <= 1) {
        clearInterval(timerInterval);
        alert("times up");

        handleSubmit();
      } else if (seconds <= 1) {
        setTime({
          ...time,
          min: minutes - 1,
          sec: 59,
        });
      } else {
        setTime({
          ...time,
          sec: seconds - 1,
        });
      }
    };

    switch (testState) {
      case "mock":
        timerInterval = setInterval(updateCountDown, 1000);
        break;
      case "freeTest":
        timerInterval = setInterval(updateCountDown, 1000);
        break;
      case "practice":
        clearInterval(timerInterval);
        break;
      default:
        break;
    }
    return () => {
      clearInterval(timerInterval);
    };
  });

  // handle change after selecting an option
  const handleChange = (event) => {
    const { value } = event.target;
    const { style } = event.target.parentNode;
    setChecked(value);
    dispatch(setRegAns({ value, currentQues: currentIndex }));
    console.log({ correctAnswer, value });
    if (value === `${correctAnswer}`) {
      // here value is number,correctAnswer is char;
      style.border = "2px solid #00FF00";
    } else {
      style.border = "2px solid #FF0000";
    }
    setTimeout(() => {
      style.border = "";
      handleNext();
    }, 100);
  };
  // handle Next
  const handleNext = () => {
    if (questions.length > currentIndex + 1) {
      dispatch(next());
      if (!regAns[currentIndex + 1]) {
        setChecked("");
      } else {
        setChecked(regAns[currentIndex + 1]);
      }
    }

    progressCount !== 100 &&
      setProgressCount((prev) => {
        return prev + percentagePerQuestion;
      });

    if (currentIndex + 1 === question.length - 1) {
      setProgressCount((prev) => {
        return prev + percentagePerQuestion;
      });
    }
    console.log(regAns);
  };
  // handle previous
  const handlePrev = () => {
    if (currentIndex !== 0) {
      dispatch(prev());
      setChecked(regAns[currentIndex - 1]);
      setProgressCount((prev) => {
        return prev - percentagePerQuestion;
      });
    }
  };
  // prevent reload or page leave
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }

    return ""; // Legacy method for cross browser support
  };
  return (
    <>
      <div className="w-[100%] h-screen p-4 md:p-8  md:px-24 mx-auto bg-slate-900 text-gray-300 mb-20">
        {/* meta */}
        <div className="w-full">
          <div class="w-full mb-2 h-3 rounded-full bg-gray-800">
            <div
              class="max-w-full h-3 rounded-full bg-orange-500"
              style={{ width: progressCount + "%" }}
            ></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between font-medium">
            {testState !== "practice" ? (
              <h6>
                Remaining time: {time.min < 10 ? "0" + time.min : time.min} :
                {time.sec < 10 ? "0" + time.sec : time.sec}
              </h6>
            ) : (
              <div></div>
            )}

            <h6 className="">progress: {Math.round(progressCount)}%</h6>
          </div>
        </div>
        {/* questions */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center m-3 sm:m-5">
            <h5 className="text-sm font-bold">
              Question: {currentIndex + 1} / {questions.length} :
            </h5>
            <h3 className="text-sm font-medium my-2 sm:w-[75%] text-center max-[375px]:font-normal">
              {question}
            </h3>
          </div>

          <div className="">
            {mediaType === "image" && content && (
              <img
                className="w-[300px] sm:w-[350px] h-50px sm:h-60 mb-5"
                src={`http://appsbreaking.com/qimage/${content}`}
                alt="content"
              />
            )}
            {/* {mediaType === "video" && content && (
              <div className="text-center text-base-100 my-auto">
                <h2>Video Preview:</h2>
                <span>No Video</span>
              </div>
            )} */}
            {/* <div className="player">
              <ReactPlayer
                url={content}
                controls={true}
                outline={true}
              ></ReactPlayer>
            </div> */}
          </div>

          {/* <img src={questionCircleIcon} alt="icon" /> */}
        </div>
        {/* options */}
        <div className="grid sm:grid-cols-2 gap-2">
          <label
            className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
            htmlFor="option1"
            style={{ backgroundColor: checked === "0" && "palegoldenrod" }}
          >
            <input
              className="appearance-none"
              id="option1"
              type="radio"
              value="0"
              name="option"
              checked={checked === "0"}
              onChange={handleChange}
            />
            {answers[0]}
          </label>

          <label
            className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
            htmlFor="option2"
            style={{ backgroundColor: checked === "1" && "palegoldenrod" }}
          >
            <input
              className="appearance-none"
              id="option2"
              type="radio"
              value="1"
              name="option"
              checked={checked === "1"}
              onChange={handleChange}
            />
            {answers[1]}
          </label>

          <label
            className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
            htmlFor="option3"
            style={{ backgroundColor: checked === "2" && "palegoldenrod" }}
          >
            <input
              className="appearance-none"
              id="option3"
              type="radio"
              value="2"
              name="option"
              checked={checked === "2"}
              onChange={handleChange}
            />
            {answers[2]}
          </label>

          <label
            className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
            htmlFor="option4"
            style={{ backgroundColor: checked === "3" && "palegoldenrod" }}
          >
            <input
              className="appearance-none"
              id="option4"
              type="radio"
              value="3"
              name="option"
              checked={checked === "3"}
              onChange={handleChange}
            />
            {answers[3]}
          </label>
        </div>
        {/* action  */}
        <div className="fixed w-full left-0 bottom-0 py-4 px-24 bg-slate-800">
          <div
            className={`flex  gap-2 justify-center ${
              currentIndex === questions.length - 1 &&
              " max-[375px]:items-center max-[375px]:flex-col "
            } `}
          >
            <div className="flex gap-1">
              <button
                className="btn bg-blue-700 hover:bg-blue-800 disabled:bg-slate-600"
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                Prev
              </button>
              <button
                className="btn bg-blue-700 hover:bg-blue-800 disabled:bg-slate-600"
                disabled={currentIndex === questions.length - 1}
                onClick={handleNext}
              >
                Next
              </button>
              <button
                className="btn bg-yellow-700 hover:bg-yellow-800 disabled:bg-slate-600"
                disabled={currentIndex === questions.length - 1}
                onClick={handleNext}
              >
                Skip
              </button>
            </div>
            <div className="flex gap-1">
              {currentIndex === questions.length - 1 && (
                <button
                  className="btn bg-green-700 hover:bg-green-800"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
              <button
                type="button"
                className="btn bg-red-700 hover:bg-red-800"
                onClick={handleQuit}
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
