import React, {Component} from "react";
import {connect} from "react-redux";
import Question from "../common/Question"
import ListQuestions from "../common/ListQuestions";

class Questions extends Component {
    render() {
        return (
            <div className='questions'>
                <ListQuestions title='Unanswered' questionIds={this.props.questionUnasweredIds} />
                <ListQuestions title='Answered' questionIds={this.props.questionsAnsweredIds} />
            </div>
        );
    }
}

function mapStateToProps({questions, authedUser}) {
    const questionsUnansweredIds = Object.values(questions)
        .filter((q) => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser))
        .map((q) => q.id);

    const questionsAnsweredIds = Object.values(questions)
        .filter((q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
        .map((q) => q.id);

    return {
        questionUnasweredIds: questionsUnansweredIds.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        questionsAnsweredIds: questionsAnsweredIds.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Questions)