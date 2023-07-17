import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const UserProgress = ({ title }) => {
  const auth = getAuth();
  const { isLogedin } = useSelector((state) => state.auth.value);
  const [result, setResult] = useState({
    questions: 0,
    regAns: 0,
    correctAns: 0,
    wrongAns: 0,
  });
  useEffect(() => {
    const getUserProgress = async () => {
      const user = auth.currentUser;
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", user.uid, `${title}`),
          orderBy("timestamp", "desc"),
          limit(1)
        )
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setResult(doc.data());
      });
    };
    isLogedin && getUserProgress();
  }, []);

  const getPercentage = (actualValue, totalValue) => {
    const percentage = (actualValue / totalValue) * 100;
    return Math.round(percentage);
  };
  return (
    <div className="btn-right">
      {result.questions ? (
        <>
          {getPercentage(result.correctAns, result.questions.length) < 100 ? (
            <span className="font-bold text-yellow-500">
              Pending{" "}
              {100 - getPercentage(result.correctAns, result.questions.length)}%
            </span>
          ) : (
            <span className="font-bold text-green-600">
              Completed{" "}
              {getPercentage(result.correctAns, result.questions.length)}%
            </span>
          )}

          <span className="text-red-700 font-bold ml-1">
            Corract: {result.correctAns}/{result.questions.length}
          </span>
        </>
      ) : (
        <span className="font-semibold text-slate-700">Give a test</span>
      )}
    </div>
  );
};

export default UserProgress;
