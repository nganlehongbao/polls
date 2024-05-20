import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login,
  selectCurrentUser,
} from '../store/rootSlice';
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, path } = useSelector((state) => state.root);
  let usersList = [];
  Object.keys(users).forEach(function (key) {
    usersList.push(users[key]);
  });

  const userInfo = useSelector(selectCurrentUser);
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(userInfo){
      navigate(path || "/dashboard");
    }
  }, [userInfo])

  useEffect(() => {
    if(isSubmit){
      // setIsSubmit(false);
      dispatch(login({ id, password }));
    }
  }, [isSubmit])

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.elements.user.value;
    const password = event.target.elements.password.value;
    // const id = "sarahedo";
    // const password = "password123";
    setId(id);
    setPassword(password);
    setIsSubmit(true);
  }
  
  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/9131/9131514.png"
              alt="Your Company"
            />
            <h2 data-testid='user-label' className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="user" className="block text-left text-sm font-medium leading-6 text-gray-900">
                  User
                </label>
                <div className="mt-2">
                  {/* <input
                    id="user"
                    name="user"
                    type="text"
                    autoComplete="user"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  /> */}
                <select id="user" name="user" className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
                  {usersList.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                {/* {!loginValid && <span className="block mt-3 text-red-400 ">Invalid username or password! Please try again!</span>} */}
              </div>
            </form>
          </div>
        </div>
      </>
  )
}
export default LoginScreen