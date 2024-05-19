import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestionAsync } from "../store/rootSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function QuestionAdd() {
  const { userInfo } = useSelector((state) => state.root);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  useEffect(() => {
    if(isSubmit){
      dispatch(
        saveQuestionAsync({
          optionOneText: optionOne,
          optionTwoText: optionTwo,
          author: userInfo.id,
        })
      ).unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
    }
  },[dispatch, isSubmit, navigate, optionOne, optionTwo, userInfo.id])

  const handleSubmit = (event) => {
    event.preventDefault();
    setOptionOne(event.target.elements.firstOption.value);
    setOptionTwo(event.target.elements.secondOption.value);
    setIsSubmit(true);
  };

  return (
    <div>
      {/* <div>
        <UserInfo />
      </div> */}
      <Header title='New' />
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Would you rather
          </h2>
          <p className="text-slate-400">Create your own poll</p>
        </div>
        <form
          className='space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor='firstOption'
              className='block text-left text-sm font-medium leading-6 text-gray-900'
            >
              First Option
            </label>
            <div className='mt-2'>
              <input
                id='firstOption'
                name='firstOption'
                placeholder="Option One"
                type='text'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='secondOption'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Second Option
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='secondOption'
                name='secondOption'
                placeholder="Option Two"
                type='text'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestionAdd;
