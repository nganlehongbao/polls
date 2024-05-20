import renderer from 'react-test-renderer';
import { _saveQuestion, _saveQuestionAnswer } from "./utils/_DATA"

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from "react-router-dom";
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard';
import QuestionAdd from './components/QuestionAdd';
import Poll from './components/Poll';

describe('_saveQuestion', () => {
    it('will return formatted question if all data is passed correctly', async () => {
        var question = {
            author: 'sarahedo',
            optionOneText: 'take a Option 1',
            optionTwoText: 'take a Option 2',
        };
        var result = await _saveQuestion(question);
        expect(result.author).toEqual('sarahedo');
        expect(result.optionOne.text).toEqual('take a Option 1');
        expect(result.optionTwo.text).toEqual('take a Option 2');
    });

    it('will return formatted question if all data is passed correctly', async () => {
        var question = {
            author: 'sarahedo',
            optionOneText: 'add question with Option 1',
            optionTwoText: 'add question with Option 2',
        };
        var result = await _saveQuestion(question);
        expect(result.author).toEqual('sarahedo');
        expect(result.optionOne.text).toEqual('add question with Option 1');
        expect(result.optionTwo.text).toEqual('add question with Option 2');
    });

    it('will return error if data passed is incorrect', async () => {
        var wrongQuestion = {
            optionOne: {
                text: 'take a Option 1',
            }
        };
        await expect(_saveQuestion(wrongQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
})

describe('_saveQuestionAnswer', () => {
    it('will return true if all data is passed correctly', async () => {
        var info = {
            authedUser: 'zoshikanlu',
            qid: '8xf0y6ziyjabvozdd253nd',
            answer: 'optionTwo',
        };
        var result = await _saveQuestionAnswer(info);
        expect(result).toEqual(true);
    });

    it('will return error if data passed is incorrect', async () => {
        var wrongInfo = {
            authedUser: 'zoshikanlu',
            qid: 'vthrdm985a262al8qx3do',
        };
        await expect(_saveQuestionAnswer(wrongInfo)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it('will return error if data passed is incorrect case 2', async () => {
        var wrongInfo = {
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionTwo',
        };
        await expect(_saveQuestionAnswer(wrongInfo)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it('will return error if data passed is incorrect case 3', async () => {
        var wrongInfo = {
            authedUser: 'zoshikanlu',
            answer: 'optionTwo',
        };
        await expect(_saveQuestionAnswer(wrongInfo)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it('will return error if data passed is incorrect case 4', async () => {
        var wrongInfo = {
            answer: 'optionTwo',
        };
        await expect(_saveQuestionAnswer(wrongInfo)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it('will return error if data passed is incorrect case 5', async () => {
        var wrongInfo = {
        };
        await expect(_saveQuestionAnswer(wrongInfo)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });
})

describe('Login Page Test', () => {
    it('will show Login Page', async () => {
        const screen = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginScreen />
                </BrowserRouter>
            </Provider>
        );

        expect(screen).toMatchSnapshot();
    });

    it('check data on screen Login Page', async () => {
        const screen = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginScreen />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('user-label')).toHaveTextContent('Sign in to your account');
    });
})

describe('Add Question Test', () => {
    it('show screen Add Question', async () => {
        const screen = render(
            <Provider store={store}>
                <BrowserRouter>
                    <QuestionAdd />
                </BrowserRouter>
            </Provider>
        );

        expect(screen).toMatchSnapshot();

    });

    it('input data screen Add Question', async () => {
        const screen = render(
            <Provider store={store}>
                <BrowserRouter>
                    <QuestionAdd />
                </BrowserRouter>
            </Provider>
        );

        const optionOne = screen.getByTestId('optionOne');
        const optionTwo = screen.getByTestId('optionTwo');
        expect(optionOne.value).toMatch("");
        expect(optionTwo.value).toMatch("");

        fireEvent.change(optionOne, { target: { value: 'optionOne test' } });
        fireEvent.change(optionTwo, { target: { value: 'optionTwo test' } });
        expect(optionOne.value).toMatch("optionOne test");
        expect(optionTwo.value).toMatch("optionTwo test");

    });

    it('change input data screen Add Question', async () => {
        const screen = render(
            <Provider store={store}>
                <BrowserRouter>
                    <QuestionAdd />
                </BrowserRouter>
            </Provider>
        );

        const optionOne = screen.getByTestId('optionOne');
        const optionTwo = screen.getByTestId('optionTwo');
        expect(optionOne.value).toMatch("");
        expect(optionTwo.value).toMatch("");

        fireEvent.change(optionOne, { target: { value: 'optionOne test' } });
        fireEvent.change(optionTwo, { target: { value: 'optionTwo test' } });
        expect(optionOne.value).toMatch("optionOne test");
        expect(optionTwo.value).toMatch("optionTwo test");

        fireEvent.change(optionOne, { target: { value: 'optionOne test change' } });
        fireEvent.change(optionTwo, { target: { value: 'optionTwo test change' } });
        expect(optionOne.value).toMatch("optionOne test change");
        expect(optionTwo.value).toMatch("optionTwo test change");

    });

})
