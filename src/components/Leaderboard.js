import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

function Leaderboard() {
  const { users } = useSelector((state) => state.root);
  let userList = [];
  Object.keys(users).forEach((key) => {
    userList.push(users[key]);
  });

  userList.sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      (Object.keys(a.answers).length + Object.keys(a.questions).length)
  );

  return (
    <div>
      <Header title='Leadership' />
      <table className='mt-10 border-collapse mx-auto table-auto w-3/4 text-sm border-2 rounded-2'>
        <thead>
          <tr>
            <th className='pt-3 bg-slate-50 border-b text-sm p-4 pl-8 pb-3 text-slate-800 text-left'>
              Users
            </th>
            <th className='pt-3 bg-slate-50 border-b text-sm p-4 pb-3 text-slate-800 text-left'>
              Answerd
            </th>
            <th className='pt-3 bg-slate-50 border-b text-sm p-4 pr-8 pb-3 text-slate-800 text-left'>
              Created
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-slate-800'>
          {userList.map((user) => {
            return (
              <tr key={user.id}>
                <td className='border-b border-slate-100 p-4 pl-8 text-slate-500 text-left'>
                  <div className='flex justify-items-center'>
                    <img
                      className='w-16 h-16 rounded-full'
                      src={"/image/" + user.avatarURL}
                      alt=''
                    />
                    <div className='flex flex-col my-auto'>
                      <span className="font-bold">{user.name}</span>
                      <span>{user.id}</span>
                    </div>
                  </div>
                </td>
                <td className='border-b border-slate-100 p-4 text-slate-500 text-left'>
                  {Object.keys(user.questions).length}
                </td>
                <td className='border-b border-slate-100 p-4 pr-8 text-slate-500 text-left'>
                  {Object.keys(user.answers).length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
