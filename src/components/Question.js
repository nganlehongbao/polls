import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { formatDate } from "../utils/helpers";

function Question({ flgAnswered, question }) {
  // const { userInfo } = useSelector((state) => state.root);
  // let total = question.optionOne.votes.length + question.optionTwo.votes.length;
  // let rateOptionOne = total
  //   ? Math.round((question.optionOne.votes.length * 100) / total)
  //   : 0;
  // let rateOptionTwo = total
  //   ? Math.round((question.optionTwo.votes.length * 100) / total)
  //   : 0;

  // let votedOptionOne = question.optionOne.votes.includes(userInfo.id)
  //   ? "voted"
  //   : "";
  // let votedOptionTwo = question.optionTwo.votes.includes(userInfo.id)
  //   ? "voted"
  //   : "";

  return (
    <li key={question.id} className='flex justify-between gap-x-6 py-5'>
      <div className='flex min-w-0 gap-x-4'>
        <div className='min-w-0 flex-auto'>
          <p className='text-sm text-left font-semibold leading-6 text-gray-900'>
            {question.author}
          </p>
          <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
            {formatDate(question.timestamp)}
          </p>
        </div>
      </div>
      <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
        {!flgAnswered ? (
          <button
            type='button'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
          >
            <Link to={`/vote/${question.id}`}>Vote</Link>
          </button>
        ) : (
          <button
            type='button'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
          >
            <Link to={`/vote/${question.id}`}>Vote</Link>
          </button>
        )}
      </div>
    </li>
  );
}

export default Question;
