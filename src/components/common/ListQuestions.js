import React, {Component, Fragment} from "react";
import QuestionPreview from "./QuestionPreview";

class ListQuestions extends Component {

    render() {
        const { questionIds, title } = this.props;
        return (
            <Fragment>
                {title !== '' && (<h4>{title}</h4>)}
                {questionIds.length !== 0
                    ? (
                        <ul className='questions-list'>
                            {this.props.questionIds.map((id) => (
                                <li key={id}>

                                    <QuestionPreview id={id}/>
                                </li>
                            ))}
                        </ul>
                    )
                    : (<p className='empty-list'>Empty list</p>)
                }
            </Fragment>
        );
    }

}

export default ListQuestions