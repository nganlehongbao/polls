import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestionAnswerAsync } from "../store/rootSlice";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import ErrorPage from "./ErrorPage";

function Poll() {
  const { userInfo } = useSelector((state) => state.root);
  let { question_id } = useParams();
  const navigate = useNavigate();
  const question = useSelector((state) => state.root.questions[question_id]);

  let user = useSelector((state) => state.root.users[question?.author || '']);

  const [isVote, setIsVote] = useState(false);
  const [option, setOption] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    checkVoted();
  },[userInfo])
  useEffect(() => {
    if(isVote){
      dispatch(
        saveQuestionAnswerAsync({
          authedUser: userInfo.id,
          qid: question_id,
          answer: option,
        })
      ).unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch((rejectedValueOrSerializedError) => {
          alert(rejectedValueOrSerializedError.message);
        });
    }
  }, [isVote])

  const handleVote = (option) => {
    setOption(option);
    setIsVote(true);
  };
  const checkVoted = () => {
    let answers = [];
    Object.keys(userInfo.answers).forEach(key => {
      answers.push(key);
    });
    if(question && answers.find((id) => id === question?.id)){
      setAnswer(userInfo.answers[question?.id]);
    }
  }

  if (!question) {
    return (<ErrorPage />)
  }


  return (
    question && 
    <div>
      <Header />
      <div>
        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Poll by {question.author}
        </h1>
        <img
          className='w-70 h-70 rounded-full mx-auto'
          src={"/image/" + user.avatarURL}
          alt='avt'
        />
        <div className='mt-10 flex flex-auto justify-center'>
          <div className='m-5 p-5 border-2 rounded'>
            <p>{question.optionOne.text}</p>
            <button
              className={`${answer === "optionOne" || answer==="" ? " bg-sky-500 text-white border border-sky-500 hover:bg-white hover:text-sky-500 font-medium rounded-lg text-sm" : "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"} mt-3 px-5 py-1.5 text-bold `}
              disabled={(answer !== "" ? true: false)}
              onClick={() => handleVote("optionOne")}
            >
              Vote
            </button>
          </div>
          <div className='m-5 p-5 border-2 rounded'>
            <p>{question.optionTwo.text}</p>
            <button
              className={`${answer === "optionTwo" || answer==="" ? " bg-sky-500 text-white border border-sky-500 hover:bg-white hover:text-sky-500 font-medium rounded-lg text-sm" : "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"} mt-3 px-5 py-1.5 text-bold`}
              disabled={(answer !== "" ? true: false)}
              onClick={() => handleVote("optionTwo")}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
