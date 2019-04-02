import React, {Component, Fragment} from "react";
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from "./home/Header";
import Questions from "./home/Questions";
import NewQuestion from "./home/NewQuestion";
import Leaderboard from "./home/Leaderboard";
import QuestionDetails from "./home/QuestionDetails";
import {handleHomeData} from "../actions/shared";
import {isEmptyObject} from "../utils/helper";

class Home extends Component {

    componentDidMount() {
        const {isAuthenticated} = this.props;

        if (isAuthenticated) {
            this.props.dispatch(handleHomeData());
        }
    }

    render() {
        const {isAuthenticated} = this.props;
        if (!isAuthenticated) {
            return <Redirect to='/'/>
        }

        return (
            <Fragment>
                {isAuthenticated && !this.props.loading && (
                    <Fragment>
                        <Header/>
                        <div className='container home'>
                            <Route path='/home' exact component={Questions}/>
                            <Route path='/home/newQuestion' exact component={NewQuestion}/>
                            <Route path='/home/leaderboard' exact component={Leaderboard}/>
                            <Route path='/home/questions/:question_id' component={QuestionDetails}/>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser, users, questions}) {

    return {
        isAuthenticated: authedUser !== null,
        loading: isEmptyObject(questions),
        questions,
        users
    }
}

export default connect(mapStateToProps)(Home)