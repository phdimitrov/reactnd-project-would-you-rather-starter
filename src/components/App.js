import React, {Component, Fragment} from 'react';
import {handleInitialData} from "../actions/shared";
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading';
import { isEmptyObject } from '../utils/helper'
import SignIn from './SignIn';
import Home from './Home';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        {this.props.loading === true
                            ? <div>Loading...</div>
                            : <div>
                                <Route path='/' exact component={SignIn}/>
                                <Route path='/home' component={Home}/>
                            </div>}
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        loading: isEmptyObject(users)
    }
}

export default connect(mapStateToProps)(App);
