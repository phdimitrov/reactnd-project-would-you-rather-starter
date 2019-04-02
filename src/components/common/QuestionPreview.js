import React, {Component} from "react";
import {connect} from "react-redux";
import User from "./User";
import {formatQuestion} from "../../utils/helper";
import {Link} from 'react-router-dom'

class QuestionPreview extends Component {

    render() {
        const {question} = this.props;

        const {id, optionOne, optionTwo, author} = question;

        return (
            <div className='question-info'>
                <User user={author} showName={true}/>
                <div className='asks'>Would you rather:</div>
                <div className='description'>{optionOne.text}...or...{optionTwo.text}</div>
                <Link to={`/home/questions/${id}`} className='link'>Open Poll</Link>
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

export default connect(mapStateToProps)(QuestionPreview)