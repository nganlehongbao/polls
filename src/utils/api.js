import { _getUsers, _getQuestions, _saveQuestion } from "./_DATA.js";

export function getInitialData() {
  return Promise.all([
    _getQuestions,
    _getUsers,
  ]).then(([questions, users]) => ({
    questions,
    users
  }))
}

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestion() {
  return _saveQuestion();
}

export function login({id, password}) {
  console.log(id.password);
    return Promise.resolve(_getUsers().then((result) => {
        for(var key in result) {
            if(result[key].id === id.id && result[key].password === id.password){
              return new Promise((resolve) => {
                setTimeout(() => resolve(result[key]), 1000)
              });
            }
        };
        return new Promise((resolve) => {
          setTimeout(() => resolve(false), 1000)
        });
    }));
}
