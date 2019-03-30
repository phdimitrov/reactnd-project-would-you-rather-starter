import React, {Component} from "react";
import {connect} from 'react-redux'
import { FaQuestion } from 'react-icons/fa/index';
import User from './User'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {

    handleSignIn = (user) => {
        const { id } = user;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(id));
        this.props.history.push(`/home`);
    };

    render() {
        const { users } = this.props;
        return (
            <div className='signin'>
                <h3>Select user to sign in</h3>
                <FaQuestion />
                <ul>
                    {Object.values(users).map((user) => (
                        <li key={user.id} onClick={() => this.handleSignIn(user)}>
                            <User user={user} showName={true} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps ({users}) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(SignIn);