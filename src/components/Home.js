import React, {Component, Fragment} from "react";
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from "./home/Header";
import Questions from "./home/Questions";
import NewQuestion from "./home/NewQuestion";
import Leaderboard from "./home/Leaderboard";

class Home extends Component {

    render() {
        return (
            <Fragment>
            <Header />
            <div className='container home'>

                <Route path='/home/questions' exact component={Questions}/>
                <Route path='/home/newQuestion' exact component={NewQuestion}/>
                <Route path='/home/leaderboard' exact component={Leaderboard}/>
            </div>
            </Fragment>
        );
    }
}

function mapStateToProps ({authedUser, users}) {
    return {
        isAuthenticated: authedUser !== null,
    }
}

export default connect(mapStateToProps)(Home)