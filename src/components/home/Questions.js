import React, {Component} from "react";
import {connect} from "react-redux";
import Question from "../common/Question"

class Questions extends Component {
    render() {
        return (
            <div className='questions'>
                <h4>Unanswered</h4>
                <ul className='unanswered-list'>
                    {this.props.questionUnasweredIds.map((id) => (
                        <li key={id}>
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
                <h4>Answered</h4>
                <ul className='answered-list'>
                    {this.props.questionsAnsweredIds.map((id) => (
                        <li key={id}>
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
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
        questionUnasweredIds: questionsUnansweredIds.sort( (a,b) => questions[b].timestamp - questions[a].timestamp),
        questionsAnsweredIds: questionsAnsweredIds.sort( (a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Questions)