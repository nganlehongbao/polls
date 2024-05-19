import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

let users = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: '../image/sarahedo.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    password: 'abc321',
    name: 'Tyler McGinnis',
    avatarURL: '../image/tylermcginnis.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  mtsamis: {
    id: 'mtsamis',
    password: 'xyz123',
    name: 'Mike Tsamis',
    avatarURL: 'mtsamis.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  zoshikanlu: {
    id: 'zoshikanlu',
    password: 'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL: 'zoshikanlu.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'mtsamis',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'hire more frontend developers',
    },
    optionTwo: {
      votes: ['mtsamis', 'sarahedo'],
      text: 'hire more backend developers'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'conduct a release retrospective 1 week after a release',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'conduct release retrospectives quarterly'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'have code reviews conducted by peers',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'have code reviews conducted by managers'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['mtsamis'],
      text: 'take a course on unit testing with Jest'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'mtsamis',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['mtsamis', 'zoshikanlu'],
      text: 'deploy to production once every two weeks',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'deploy to production once every month'
    }
  },
}

const initialState = {
  questions: questions,
  userInfo: null,
  users: users,
  path: null,
  status: 'idle',
};

export const saveQuestionAsync = createAsyncThunk(
  'question/saveQuestion',
  async (question) => {
    const response = await _saveQuestion(question);
    return response;
  }
);

export const saveQuestionAnswerAsync = createAsyncThunk(
  'question/saveQuestionAnswer',
  async ({ authedUser, qid, answer }) => {
    const response = await _saveQuestionAnswer({ authedUser, qid, answer });
    return response;
  }
);

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredPaths: ["root.questions", "root.users"],
  }
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
    login: (state, action) => {
      let user = users[action.payload.id];
      if (user.password === action.payload.password) {
        state.userInfo = {
          ...user
        };
      } else {
        state.userInfo = null
      }
    },
    historyPath: (state, action) => {
      let path = action.payload.path;
      state.path = path;
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(defaultMiddlewareConfig),
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(saveQuestionAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveQuestionAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const authedUser = action.payload.author;
        state.users = {
          ...state.users,
          [authedUser]: {
            ...state.users[authedUser],
            questions: [
              ...state.users[authedUser].questions,
              action.payload.id
            ]
          }
        }
        state.questions = {
          ...state.questions,
          [action.payload.id]: action.payload
        }
      })
      .addCase(saveQuestionAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      })
      .addCase(saveQuestionAnswerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveQuestionAnswerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const qid = action.meta.arg.qid;
        const answer = action.meta.arg.answer;
        const authedUser = action.meta.arg.authedUser;
        state.users = {
          ...state.users,
          [authedUser]: {
            ...state.users[authedUser],
            answers: {
              ...state.users[authedUser].answers,
              [qid]: answer
            }
          }
        }

        state.questions = {
          ...state.questions,
          [qid]: {
            ...state.questions[qid],
            [answer]: {
              ...state.questions[qid][answer],
              votes: state.questions[qid][answer].votes.concat([authedUser])
            }
          }
        }
      })
      .addCase(saveQuestionAnswerAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export const { logout, login, historyPath } = rootSlice.actions;

export const selectCurrentUser = (state) => state.root.userInfo;

export default rootSlice.reducer;
