import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import ListQuestions from "../common/ListQuestions";

class Questions extends Component {
    state = {
        activeList: 'unanswered'
    };

    handleListChange = (e, listName) => {
        e.preventDefault();
        this.setState({
            activeList: listName
        });
    };

    render() {

        const {activeList} = this.state;

        return (
            <Fragment>
                <div className='questionsNav'>
                    <button
                        onClick={(e) => this.handleListChange(e, 'unanswered')}
                        className={activeList === 'unanswered' ? 'active' : ''}>
                        Unanswered
                    </button>
                    <button
                        onClick={(e) => this.handleListChange(e, 'answered')}
                        className={activeList === 'answered' ? 'active' : ''}>
                        Answered
                    </button>
                </div>
                <div className='questions'>
                    {activeList === 'unanswered'
                        ? <ListQuestions questionIds={this.props.questionsUnasweredIds}/>
                        : <ListQuestions questionIds={this.props.questionsAnsweredIds}/>
                    }
                </div>
            </Fragment>
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
        questionsUnasweredIds: questionsUnansweredIds.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        questionsAnsweredIds: questionsAnsweredIds.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Questions)