export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function formatQuestion (question, author, authedUser) {
    const { id, optionOne, optionTwo } = question;

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePercentage = (totalVotes === 0 ? 0 : (optionOne.votes.length * 100) / totalVotes).toFixed(0);
    const optionTwoPercentage = 100 - optionOnePercentage;

    return {
        id,
        optionOne: {
            ...optionOne,
            percentage : optionOnePercentage,
            hasAnswered : optionOne.votes.includes(authedUser)
        },
        optionTwo: {
            ...optionTwo,
            percentage : optionTwoPercentage,
            hasAnswered : optionTwo.votes.includes(authedUser)
        },
        totalVotes,
        author
    }
}