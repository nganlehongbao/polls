import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Question from './Question';


function Dashboard() {
  const { userInfo, users, questions } = useSelector((state) => state.root)

  let answeredList = [];
  Object.keys(users[userInfo.id].answers).forEach(key => {
    answeredList.push(key);
  });

  let questionsList = [];
  Object.keys(questions).forEach(key => {
    questionsList.push(questions[key]);
  });
  questionsList.sort((a, b) => b.timestamp - a.timestamp);
  let questionsAnswered = questionsList.filter(question => answeredList.includes(question.id))
  let questionsUnAnswered = questionsList.filter(question => !answeredList.includes(question.id))

  return (
    <div>
      <Header title="Dashboard"/>
      <div className='md:container mx-auto mt-10'>
        <div className='mx-auto max-w-4xl p-5 border-2 rounded'>
          <h1 className='text-xl font-bold'>New Questions</h1>
          <ul className='divide-y divide-gray-100'>
            {questionsUnAnswered.map((question) => (
              <Question key={question.id} flgAnswered={false} question={question} />
            ))}
          </ul>
        </div>
        <div className='mt-5 mx-auto max-w-4xl p-5 border-2 rounded'>
          <h1 className='text-xl font-bold'>Answer Questions</h1>
          <ul className='divide-y divide-gray-100'>
            {questionsAnswered.map((question, i) => (
              <Question key={question.id} flgAnswered={true} question={question} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard