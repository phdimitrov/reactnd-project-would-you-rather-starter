export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION';
export const SAVE_USER_QUESTION_ANSWER = 'SAVE_USER_QUESTION_ANSWER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function saveUserQuestionAnswer ({authedUser, qid, answer}) {
    return {
        type: SAVE_USER_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function saveUserQuestion (question) {
    return {
        type: SAVE_USER_QUESTION,
        question,
    }
}