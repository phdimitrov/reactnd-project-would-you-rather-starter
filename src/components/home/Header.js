import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {FaSignOutAlt} from 'react-icons/fa/index';
import User from "../common/User";
import Nav from "./Nav";
import {logoutAuthedUser} from "../../actions/authedUser";

class Header extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logoutAuthedUser());
    };

    render() {
        const { user } = this.props;
        return (
            <div className='header'>
                <Nav/>
                <div className='user-area'>
                    <User user={user} showName={true} />
                    <FaSignOutAlt onClick={(e) => this.handleLogout(e)} className='logout'/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Header)