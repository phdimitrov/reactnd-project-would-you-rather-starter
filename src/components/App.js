import React, {Component, Fragment} from 'react';
import {handleInitialData} from "../actions/shared";
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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

                        {this.props.loading
                            ? <div>Loading...</div>
                            : <div>
                                <Switch>
                                    <Route path='/' exact component={SignIn}/>
                                    <Route path='/home' component={Home}/>
                                    <Route render={() => <div className='container'>404. Not found</div>}/>
                                </Switch>
                            </div>}

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
