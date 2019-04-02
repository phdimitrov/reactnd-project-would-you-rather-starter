import React, {Component} from "react";

class User extends Component {

    render() {

        const {showName} = this.props;
        const {avatarURL, name} = this.props.user;

        return (
            <div className='user'>
                <img
                    src={avatarURL}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                {showName && (<span className='name'>{name}</span>)}
            </div>
        );
    }
}

export default User;