import React, {Component, Fragment} from "react";
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from "./home/Header";
import Questions from "./home/Questions";
import NewQuestion from "./home/NewQuestion";
import Leaderboard from "./home/Leaderboard";
import {handleHomeData} from "../actions/shared";

class Home extends Component {

    componentDidMount() {
        const {isAuthenticated} = this.props;

        if (isAuthenticated) {
            this.props.dispatch(handleHomeData());
        }
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className='container home'>
                    <Route path='/home' exact component={Questions}/>
                    <Route path='/home/newQuestion' exact component={NewQuestion}/>
                    <Route path='/home/leaderboard' exact component={Leaderboard}/>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser, users, questions}) {
    return {
        isAuthenticated: authedUser !== null,
        questions,
        users
    }
}

export default connect(mapStateToProps)(Home)