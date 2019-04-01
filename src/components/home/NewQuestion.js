import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {handleSaveQuestion} from "../../actions/shared";

const MAX_LENGTH_OPTION = 50;

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    };

    handleChangeOption = (e) => {
        const text = e.target.value;
        const inputName = e.target.name;

        this.setState(() => ({
            [inputName]: text
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const {dispatch, authedUser} = this.props;

        dispatch(handleSaveQuestion(authedUser, optionOneText, optionTwoText));
        console.log(this.state);
        console.log(this.props);

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true,
        }))
    };


    render() {

        const {optionOneText, optionTwoText, toHome} = this.state;

        if (toHome === true) {
            return <Redirect to='/home'/>
        }

        const invalidForm = optionOneText === '' || optionTwoText === '';

        const optionOneTextLeft = MAX_LENGTH_OPTION - optionOneText.length;
        const optionTwoTextLeft = MAX_LENGTH_OPTION - optionTwoText.length;

        return (
            <div className='question-info'>
                <h4>Create New Question</h4>
                <div className='asks'>Would you rather:</div>


                <form onSubmit={this.handleSubmit}>
                    <div className='option new-answer'>
                        <input
                            type="text"
                            name="optionOneText"
                            onChange={this.handleChangeOption}
                            maxLength={MAX_LENGTH_OPTION}/>
                        {optionOneTextLeft <= MAX_LENGTH_OPTION/2 && (
                            <div className='option-length'>Left {optionOneTextLeft}</div>
                        )}
                    </div>
                    <div className='or-separator'>OR</div>
                    <div className='option new-answer'>
                        <input
                            type="text"
                            name="optionTwoText"
                            onChange={this.handleChangeOption}
                            maxLength={MAX_LENGTH_OPTION}/>
                        {optionTwoTextLeft <= MAX_LENGTH_OPTION/2 && (
                            <div className='option-length'>Left {optionTwoTextLeft}</div>
                        )}
                    </div>
                    <button type='submit' disabled={invalidForm}>Submit</button>
                </form>


            </div>
        );
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion)