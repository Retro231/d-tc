import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import QuizMenu from "./components/feature/quiz/QuizMenu";
import QuizResult from "./components/feature/quiz/QuizResult";
import ShowQuiz from "./components/feature/quiz/ShowQuiz";
import Register from "./components/feature/auth/Register";
import Login from "./components/feature/auth/Login";
import ResetPassword from "./components/feature/auth/ResetPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setUserRegInfo,
  setLogin,
  setSubscribed,
} from "./components/feature/auth/authSlice";
import { setQuestionsDB } from "./dbSlice";
import { ref, get, child } from "firebase/database";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ques_db } from "./config/firebase";
import { getAuth } from "firebase/auth";
import Pricing from "./components/feature/pricing/Pricing";
import Main from "./Layouts/Main";
function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    const getUserSubInfo = async (uid) => {
      const querySnapshot = await getDocs(
        collection(db, "users", uid, `subscriptionInfo`)
      );
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().subscribe);
        dispatch(setSubscribed(doc.data().subscribe));
      });
    };
    // check if there is any user login
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is ------> ", authUser);
      if (authUser) {
        //the user just logged in/was logged in
        console.log(authUser);
        console.log(authUser.displayName);
        dispatch(setLogin(true));
        getUserSubInfo(authUser.uid);
      } else {
        console.log("No user");
      }
      if (authUser && authUser.displayName !== null) {
        dispatch(
          setUserRegInfo({
            name: authUser.displayName,
            email: authUser.email,
          })
        );
      }
    });

    // get question form firebase db
    const getQuestions = async () => {
      const dbRef = ref(ques_db);
      let snapshot = await get(child(dbRef, `questions`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        dispatch(setQuestionsDB(snapshot.val()));
      } else {
        console.log("no data found");
      }
    };
    getQuestions();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/pricing",
          element: <Pricing></Pricing>,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
    },
    {
      path: "/showQuiz",
      element: <ShowQuiz />,
    },
    {
      path: "/quizmenu",
      element: <QuizMenu />,
    },
    {
      path: "/quizResult",
      element: <QuizResult />,
    },
  ]);

  return (
    <div className="overflow-hidden">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
