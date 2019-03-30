import React, {Component} from "react";
import {connect} from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import User from './User'
import {handleHomeData} from "../actions/shared";
import {logoutAuthedUser} from "../actions/authedUser";
import Questions from "./home/Questions";
import NewQuestion from "./home/NewQuestion";
import Leaderboard from "./home/Leaderboard";

class Home extends Component {

    componentDidMount() {
        const {isAuthenticated} = this.props;

        if (isAuthenticated) {
            this.props.dispatch(handleHomeData());
        }
    }

    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(logoutAuthedUser());
        this.props.history.push(`/`)
    }

    render() {

        const {isAuthenticated, user} = this.props;

        if (!isAuthenticated) {
            return <Redirect to='/' />
        }

        return (

            <div>
                <User user={user}/>
                <button onClick={(e) => this.logout(e)}>
                    Logout
                </button>
                <Link to={`/home`} className='tweet'>Home</Link>
                <Link to={`/home/questions`} className='tweet'>Questions</Link>
                <Link to={`/home/newQuestion`} className='tweet'>New Questions</Link>
                <Link to={`/home/leaderboard`} className='tweet'>Leaderboard</Link>

                <hr />
                <Route path='/home/questions' exact component={Questions}/>
                <Route path='/home/newQuestion' exact component={NewQuestion}/>
                <Route path='/home/leaderboard' exact component={Leaderboard}/>
            </div>

        );
    }
}

function mapStateToProps ({authedUser, users}) {
    return {
        isAuthenticated: authedUser !== null,
        user : users[authedUser]
    }
}

export default connect(mapStateToProps)(Home)