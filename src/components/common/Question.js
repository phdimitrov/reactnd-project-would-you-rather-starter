import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import User from "./User";
import {formatQuestion} from "../../utils/helper";
import {handleAnswerQuestion} from "../../actions/shared";

class Question extends Component {

    state = {
        selectedOption: ''
    };

    handleChange = (e) => {
        const selectedOption = e.target.value;

        this.setState(() => ({
            selectedOption
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {selectedOption} = this.state;
        const {dispatch, id, authedUser} = this.props;

        console.log("selected ", selectedOption);

        dispatch(handleAnswerQuestion(authedUser, id, selectedOption));

        this.setState(() => ({
            selectedOption: ''
        }))
    };

    render() {
        const {question} = this.props;

        if (question === null) {
            return <p>No such question</p>
        }

        const {selectedOption} = this.state;

        const {optionOne, optionTwo, totalVotes, author} = question;
        const hasAnswered = optionOne.hasAnswered || optionTwo.hasAnswered;

        return (
            <div className='question-info'>
                <User user={author} showName={true}/>
                <div className='asks'>Would you rather:</div>

                {hasAnswered ? (
                    <Fragment>
                        <div className={'option answered ' + (optionOne.hasAnswered ? 'author-answer' : '')}>
                            <div>{optionOne.text}</div>
                            <div>{optionOne.votes.length} of {totalVotes} ({optionOne.percentage}%)</div>
                        </div>
                        <div className={'option answered ' + (optionTwo.hasAnswered ? 'author-answer' : '')}>
                            <div>{optionTwo.text}</div>
                            <div>{optionTwo.votes.length} of {totalVotes} ({optionTwo.percentage}%)</div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <form onSubmit={this.handleSubmit}>
                            <div className='option unanswered'>
                                <input type="radio" name="options" value="optionOne" onChange={this.handleChange}/>
                                <label>{optionOne.text}</label>
                            </div>
                            <div className='option unanswered'>
                                <input type="radio" name="options" value="optionTwo" onChange={this.handleChange}/>
                                <label>{optionTwo.text}</label>
                            </div>
                            <button type='submit' disabled={selectedOption === ''}>Submit</button>
                        </form>
                    </Fragment>
                )}
            </div>
        );
    }
}

function mapStateToProps({users, questions, authedUser}, {id}) {
    const question = questions[id];

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(Question)