import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA.js'

export function getUsers() {
    return _getUsers()
        .then((users) => ({
            users
        }))
}

export function getQuestions() {
    return _getQuestions()
        .then((questions) => ({
            questions,
        }))
}

export function setQuestion(info) {
    return _saveQuestion(info)
}

export function setQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}