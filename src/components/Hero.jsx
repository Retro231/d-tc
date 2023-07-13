import "./Hero.css";
import React from "react";
import bg1 from "./assets/bg-1.png";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { setQuestions, setTestState } from "./feature/quiz/quizSlice";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsDB = useSelector((state) => state.db.value.questionsDB);
  const demoSet = questionsDB.slice(0, 50);
  const handleDemoBtn = () => {
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
    <div className="hero-wrapper" style={{ backgroundImage: `url(${bg1})` }}>
      <div className="hero-content">
        <h2 className="title">Welcome to UK Driving Theory Revision 2023</h2>
        <p>
          Pass your Driving Theory Test in 2023 with the latest DVSA learning
          material!
        </p>
        <div className="hero-btn">
          <Button className="btn-1" onClick={handleDemoBtn}>
            Free Mock Test
          </Button>
          <Link to="#categories" smooth>
            <Button className="btn-2">Start learning</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
