// import questionCircleIcon from "./../../assets/question-circle-fill.svg";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import ReactPlayer from "react-player";
import { next, prev, setRegAns, resetQuiz } from "./quizSlice";
import { setLoading } from "../../../appSlice";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../utils/LoadingPage/LoadingPage";
const initialTime = {
  min: 50,
  sec: 0,
};

const Quiz = ({ title }) => {
  const [checked, setChecked] = useState("");
  const [time, setTime] = useState(initialTime);
  const [progressCount, setProgressCount] = useState(0);
  const [transData, setTransData] = useState(null);
  const [translate, setTranslate] = useState(false);

  // variable and redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const title = location.state.title;
  const { loading } = useSelector((state) => state.app.value);
  const state = useSelector((state) => state.quiz.value);
  const { testState, questions, currentIndex, regAns } = state;
  const { question, answers, correctAnswer, mediaType, content } =
    questions[currentIndex];

  //storing question and answer for translation;
  const forTrnsQues = { question, answers };
  const getTrnsQues = async () => {
    dispatch(setLoading(true));
    const result = await axios.post(
      "https://d-ts.vercel.app/translate",
      forTrnsQues
    );

    setTransData(result.data);
    dispatch(setLoading(false));
  };

  const handleTranslateBtn = () => {
    transData === null && getTrnsQues();
    setTranslate((prev) => {
      return !prev;
    });
  };

  const percentagePerQuestion = (1 / questions.length) * 100;
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
  }, [time]);

  // handle Next
  const handleNext = () => {
    setTransData(null);
    setTranslate(false);
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
    // console.log(regAns);
  };
  // handle previous
  const handlePrev = () => {
    setTransData(null);
    setTranslate(false);
    if (currentIndex !== 0) {
      dispatch(prev());
      setChecked(regAns[currentIndex - 1]);
      setProgressCount((prev) => {
        return prev - percentagePerQuestion;
      });
    }
  };
  // handle submit
  const handleSubmit = () => {
    setTransData(null);
    setTranslate(false);
    navigate("/quizResult", {
      state: { title: title },
      replace: true,
    });
  };
  // handle quit
  const handleQuit = () => {
    setTransData(null);
    setTranslate(false);
    setChecked("");
    setProgressCount(0);
    dispatch(resetQuiz());
    navigate("/", { replace: true });
  };

  // handle change after selecting an option

  const handleChange = (event) => {
    const { value } = event.target;
    const { style } = event.target.parentNode;
    setChecked(value);
    dispatch(setRegAns({ value, currentQues: currentIndex }));
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

  const opt1ref = useRef(null);
  const opt2ref = useRef(null);
  const opt3ref = useRef(null);
  const opt4ref = useRef(null);

  const handleChangeForPrac = (event) => {
    console.log(opt1ref.current.parentNode.style);
    const { value } = event.target;
    const { style } = event.target.parentNode;
    setChecked(value);
    dispatch(setRegAns({ value, currentQues: currentIndex }));

    if (value !== `${correctAnswer}`) {
      // here value is char ,correctAnswer is number;
      style.border = "2px solid #FF0000";
    }
    switch (`${correctAnswer}`) {
      case opt1ref.current.value:
        opt1ref.current.parentNode.style.border = "2px solid #00FF00";
        break;
      case opt2ref.current.value:
        opt2ref.current.parentNode.style.border = "2px solid #00FF00";
        break;
      case opt3ref.current.value:
        opt3ref.current.parentNode.style.border = "2px solid #00FF00";
        break;
      case opt4ref.current.value:
        opt4ref.current.parentNode.style.border = "2px solid #00FF00";
        break;

      default:
        break;
    }
    setTimeout(() => {
      style.border = "";
      opt1ref.current.parentNode.style.border = "";
      opt2ref.current.parentNode.style.border = "";
      opt3ref.current.parentNode.style.border = "";
      opt4ref.current.parentNode.style.border = "";

      handleNext();
    }, 200);
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
      {loading && <LoadingPage />}
      <div className="w-[100%] h-screen p-4 md:p-8  md:px-24 mx-auto bg-slate-900 text-gray-300 mb-[300px]">
        {/* meta */}
        <div
          className={`w-full ${
            testState === "practice" ? "invisible hidden" : "block visible"
          }`}
        >
          {/* test state managed on clssname */}
          <div className="w-full mb-2 h-3 rounded-full bg-gray-800">
            <div
              className="max-w-full h-3 rounded-full bg-orange-500"
              style={{ width: progressCount + "%" }}
            ></div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between font-medium">
            <h6>
              Remaining time: {time.min < 10 ? "0" + time.min : time.min} :
              {time.sec < 10 ? "0" + time.sec : time.sec}
            </h6>

            <h6 className="">progress: {Math.round(progressCount)}%</h6>
          </div>
        </div>
        {/* questions */}
        <div className="relative flex flex-col items-center">
          <div className="flex flex-col items-center m-3 mt-14 sm:m-5">
            <h5 className="text-sm font-bold">
              Question: {currentIndex + 1} / {questions.length} :
            </h5>
            <h3 className="text-sm font-medium my-2 sm:w-[75%] text-center max-[375px]:font-normal">
              {question}
            </h3>
            {translate && (
              <h3 className="text-sm font-medium my-2 sm:w-[75%] text-center max-[375px]:font-normal">
                {transData === null ? "" : transData.question}
              </h3>
            )}
          </div>

          <div className="">
            {mediaType === "image" && content && (
              <img
                className="w-[300px] sm:w-[350px] h-50px sm:h-60 mb-5"
                src={`http://appsbreaking.com/qimage/${content}`}
                alt="content"
              />
            )}
            {mediaType === "video" && content && (
              <div className="player w-[300px] sm:w-[450px] mb-4">
                <ReactPlayer
                  url={content}
                  controls={true}
                  width={"100%"}
                  height={"auto"}
                ></ReactPlayer>
              </div>
            )}
          </div>

          {/* <img src={questionCircleIcon} alt="icon" /> */}
          {/* translate btn */}
          {testState === "practice" && (
            <div className="inline-block absolute -top-3 sm:top-5 right-0 text-center">
              <span>Translate to :</span>
              <div className="flex gap-2 items-center mt-1">
                <button
                  className={`w-[60px] h-[30px]  rounded-full flex flex-row items-center ease-in-out duration-500 ${
                    !translate
                      ? "bg-gray-600 justify-start"
                      : "bg-green-600 justify-end"
                  }`}
                  onClick={handleTranslateBtn}
                >
                  <div
                    className={`w-[25px] h-[25px] rounded-full m-1 ${
                      !translate ? "bg-gray-300" : "bg-red-600"
                    } `}
                  ></div>
                </button>
                <p className="">Bangla</p>
              </div>
            </div>
          )}
        </div>
        {/* options */}
        <div className="grid sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
              htmlFor="option1"
              style={{ backgroundColor: checked === "0" && "palegoldenrod" }}
            >
              <input
                ref={opt1ref}
                className="appearance-none"
                id="option1"
                type="radio"
                value="0"
                name="option"
                checked={checked === "0"}
                onChange={
                  testState === "practice" ? handleChangeForPrac : handleChange
                }
              />
              {answers[0]}
            </label>
            {translate && (
              <label className="py-2 text-gray-300 font-medium pl-2 rounded-md border-2 border-transparent leading-5">
                {transData !== null && transData.answers[0]}
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
              htmlFor="option2"
              style={{ backgroundColor: checked === "1" && "palegoldenrod" }}
            >
              <input
                ref={opt2ref}
                className="appearance-none"
                id="option2"
                type="radio"
                value="1"
                name="option"
                checked={checked === "1"}
                onChange={
                  testState === "practice" ? handleChangeForPrac : handleChange
                }
              />
              {answers[1]}
            </label>
            {translate && (
              <label className="py-2 text-gray-300 font-medium pl-2 rounded-md border-2 border-transparent leading-5">
                {transData !== null && transData.answers[1]}
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
              htmlFor="option3"
              style={{ backgroundColor: checked === "2" && "palegoldenrod" }}
            >
              <input
                ref={opt3ref}
                className="appearance-none"
                id="option3"
                type="radio"
                value="2"
                name="option"
                checked={checked === "2"}
                onChange={
                  testState === "practice" ? handleChangeForPrac : handleChange
                }
              />
              {answers[2]}
            </label>
            {translate && (
              <label className="py-2 text-gray-300 font-medium pl-2 rounded-md border-2 border-transparent leading-5">
                {transData !== null && transData.answers[2]}
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="py-2 bg-gray-400 text-slate-900 font-medium pl-2 rounded-md border-2 border-transparent leading-5"
              htmlFor="option4"
              style={{ backgroundColor: checked === "3" && "palegoldenrod" }}
            >
              <input
                ref={opt4ref}
                className="appearance-none"
                id="option4"
                type="radio"
                value="3"
                name="option"
                checked={checked === "3"}
                onChange={
                  testState === "practice" ? handleChangeForPrac : handleChange
                }
              />
              {answers[3]}
            </label>
            {translate && (
              <label className="py-2 text-gray-300 font-medium pl-2 rounded-md border-2 border-transparent leading-5">
                {transData !== null && transData.answers[3]}
              </label>
            )}
          </div>
        </div>
      </div>
      {/* action  */}
      <div className="fixed w-full left-0 bottom-0 py-4 px-24 text-slate-300 bg-slate-800">
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
    </>
  );
};

export default Quiz;
