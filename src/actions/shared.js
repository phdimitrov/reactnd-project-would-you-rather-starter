import {getUsers, getQuestions, setQuestionAnswer, saveNewQuestion} from '../utils/api';
import {receiveUsers, saveUserQuestion} from '../actions/users';
import {receiveQuestions, saveQuestion, saveQuestionAnswer} from '../actions/questions';
import {showLoading, hideLoading} from 'react-redux-loading';
import {saveUserQuestionAnswer} from "./users";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getUsers()
            .then(({users}) => {
                dispatch(receiveUsers(users));
                dispatch(hideLoading());
            })
    }
}

export function handleHomeData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getQuestions()
            .then(({questions}) => {
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            })
    }
}

export function handleAnswerQuestion(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading());
        return setQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                dispatch(saveQuestionAnswer({authedUser, qid, answer}));
                dispatch(saveUserQuestionAnswer({authedUser, qid, answer}));
                dispatch(hideLoading());
            })
    }
}

export function handleSaveQuestion (authedUser, optionOneText, optionTwoText) {
    return (dispatch) => {
        dispatch(showLoading());

        return saveNewQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then((question) => {
                dispatch(saveQuestion(question));
                dispatch(saveUserQuestion(question));
                dispatch(hideLoading());
            })
    }
}
