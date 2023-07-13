import "./Quiz.css";
// import questionCircleIcon from "./../../assets/question-circle-fill.svg";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
// import ReactPlayer from "react-player";
import { next, prev, setRegAns, resetQuiz } from "./quizSlice";
import { useLocation, useNavigate } from "react-router-dom";
const initialTime = {
  min: 50,
  sec: 0,
};

const Quiz = ({ title }) => {
  // const location = useLocation();
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
  // timer
  let timerInterval;

  useEffect(() => {
    const updateCountDown = () => {
      let seconds = time.sec;
      let minutes = time.min;

      if (minutes <= 0 && seconds <= 1) {
        clearInterval(timerInterval);
        alert("times up");

        navigate("/quizResult", {
          state: { title: title },
          replace: true,
        });
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
      style.outline = "1px solid green";
    } else {
      style.outline = "1px solid #ff2929";
    }
    setTimeout(() => {
      style.outline = "";
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
    {
      progressCount !== 100 &&
        setProgressCount((prev) => {
          return prev + percentagePerQuestion;
        });
    }

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
      <div className="quiz-wrapper text-center">
        <div className="quiz-meta">
          <div className="timer">
            {testState !== "practice" && (
              <h6>
                Remaining time: {time.min < 10 ? "0" + time.min : time.min} :
                {time.sec < 10 ? "0" + time.sec : time.sec}
              </h6>
            )}
          </div>
          <div className="progressbar">
            <ProgressBar variant="warning" now={progressCount} />
          </div>
        </div>
        <div className="qus-title">
          <h5>
            Question: {currentIndex + 1} / {questions.length} :
          </h5>
          <h3>{question}</h3>
          {/* <img src={questionCircleIcon} alt="icon" /> */}
        </div>
        <div className="content text-center">
          {mediaType === "image" && content && (
            <img
              src={`http://appsbreaking.com/qimage/${content}`}
              alt="content"
            />
          )}
          {/* {mediaType === "video" && (
            <div className="player">
              <ReactPlayer
                url={content}
                controls={true}
                outline={true}
              ></ReactPlayer>
            </div>
          )} */}
        </div>
        <div className="options">
          <Row>
            <Col>
              <label
                htmlFor="option1"
                style={{ backgroundColor: checked === "0" && "palegoldenrod" }}
              >
                <input
                  id="option1"
                  type="radio"
                  value="0"
                  name="option"
                  checked={checked === "0"}
                  onChange={handleChange}
                />
                {answers[0]}
              </label>
            </Col>
            <Col>
              <label
                htmlFor="option2"
                style={{ backgroundColor: checked === "1" && "palegoldenrod" }}
              >
                <input
                  id="option2"
                  type="radio"
                  value="1"
                  name="option"
                  checked={checked === "1"}
                  onChange={handleChange}
                />
                {answers[1]}
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label
                htmlFor="option3"
                style={{ backgroundColor: checked === "2" && "palegoldenrod" }}
              >
                <input
                  id="option3"
                  type="radio"
                  value="2"
                  name="option"
                  checked={checked === "2"}
                  onChange={handleChange}
                />
                {answers[2]}
              </label>
            </Col>
            <Col>
              <label
                htmlFor="option4"
                style={{ backgroundColor: checked === "3" && "palegoldenrod" }}
              >
                <input
                  id="option4"
                  type="radio"
                  value="3"
                  name="option"
                  checked={checked === "3"}
                  onChange={handleChange}
                />
                {answers[3]}
              </label>
            </Col>
          </Row>
        </div>
        <div className="action-btn-wrapper">
          <div className="action-btn">
            <button disabled={currentIndex === 0} onClick={handlePrev}>
              Prev
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={handleNext}
            >
              Next
            </button>
            <button
              className="skip"
              disabled={currentIndex === questions.length - 1}
              onClick={handleNext}
            >
              Skip
            </button>
          </div>
          <div className="action-btn">
            {currentIndex === questions.length - 1 && (
              <button className="submit" onClick={handleSubmit}>
                Submit
              </button>
            )}
            <button type="button" className="quit" onClick={handleQuit}>
              Quit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
