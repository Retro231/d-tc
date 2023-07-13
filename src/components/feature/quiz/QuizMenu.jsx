import "./Quiz.css";
import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    <div className="quiz-menu ">
      <div className="quiz-menu-head">
        <h2>{location.state.title}</h2>
      </div>
      <div className="quiz-menu-body">
        <Row>
          <Col>
            <h4>Number Of questions</h4>
          </Col>
          <Col>
            <h4>{questions.length}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Pass Mark</h4>
          </Col>
          <Col>
            {testState === "practice" ? <h4>None</h4> : <h4>43 out of 50</h4>}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Time Limit</h4>
          </Col>
          <Col>
            {testState === "practice" ? <h4>None</h4> : <h4>57 minutes</h4>}
          </Col>
        </Row>
        <a className="quiz-menu-action-btn" onClick={handleClick}>
          Begin Test
        </a>
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
  );
};

export default QuizMenu;
