import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Question from "../common/Question";

class QuestionDetails extends Component {

    render() {
        const { question } = this.props;

        console.log(question);
        if (question === null) {
            return <p>Error 404. Question doesn't exist</p>
        }

        return (
            <Fragment>
                <Question id={question.id}/>
            </Fragment>
        );
    }

}


function mapStateToProps ({questions}, props) {
    const { question_id } = props.match.params;

    const question = questions[question_id];

    return {
        question: question ? question : null,
    }
}

export default connect(mapStateToProps)(QuestionDetails)