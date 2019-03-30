import React, {Component, Fragment} from 'react';
import {handleInitialData} from "../actions/shared";
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading';
import SignIn from './SignIn';

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
                        <Route path='/' exact component={SignIn}/>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

export default connect()(App);
