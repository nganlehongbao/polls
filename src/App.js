import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import QuestionAdd from './components/QuestionAdd';
import Poll from './components/Poll';
import Leaderboard from './components/Leaderboard';
import LoginScreen from "./components/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import RootPage from "./components/RootPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootPage />}>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/' element={<LoginScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/new' element={<QuestionAdd />} />
          <Route path='/vote/:question_id' element={<Poll />} />
          <Route path='/leadership' element={<Leaderboard />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div >
  );
}

export default App;
