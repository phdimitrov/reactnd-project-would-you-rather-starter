import {getUsers, getQuestions, setQuestionAnswer} from '../utils/api';
import {receiveUsers} from '../actions/users';
import {receiveQuestions, saveQuestionAnswer} from '../actions/questions';
import {showLoading, hideLoading} from 'react-redux-loading';

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
                dispatch(hideLoading());
            })
    }
}