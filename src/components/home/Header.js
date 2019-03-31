import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {FaSignOutAlt} from 'react-icons/fa/index';
import User from "../common/User";
import Nav from "./Nav";
import {handleHomeData} from "../../actions/shared";
import {logoutAuthedUser} from "../../actions/authedUser";

class Header extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logoutAuthedUser());
    };

    render() {
        const {isAuthenticated, user} = this.props;
        if (!isAuthenticated) {
            return <Redirect to='/'/>
        }

        return (
            <div className='header'>
                <Nav/>
                <div className='user-area'>
                    <User user={user}/>
                    <FaSignOutAlt onClick={(e) => this.handleLogout(e)} className='logout'/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        isAuthenticated: authedUser !== null,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Header)