import React, {Component} from "react";
import {connect} from 'react-redux'
import User from './common/User'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {

    handleSignIn = (user) => {
        const { id } = user;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(id));

        if (this.props.location && this.props.location.state && this.props.location.state.referrer) {
            const referrer = this.props.location.state.referrer;
            this.props.history.push(referrer);
        } else {
            this.props.history.push(`/home`);
        }

    };

    render() {
        const { users } = this.props;
        return (
            <div className='container signin'>
                <h3>Select user to sign in</h3>
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