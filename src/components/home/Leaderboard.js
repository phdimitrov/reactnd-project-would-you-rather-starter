import React, {Component} from "react";
import { connect } from "react-redux";
import User from "../common/User";

class Leaderboard extends Component {
    render() {
        const { leaders } = this.props;

        return (
            <div className='container leaderboard'>
                <h3>Leaderboard</h3>
                <ul>
                    {leaders.map((user) => (
                        <li key={user.id}>
                            <div className='user-info'>
                                <User user={user} showName={true} />
                                <div className='score'>Score {user.score}</div>
                                <div className='answered'>Answered questions {user.answered}</div>
                                <div className='created'>Created questions {user.created}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}


function mapStateToProps ({users}) {
    const leaders = Object.values(users).map((user) => {
        return {
            ...user,
            score: Object.keys(user.answers).length + user.questions.length,
            answered: Object.keys(user.answers).length,
            created: user.questions.length
        };
    });

    return {
        leaders: leaders.sort((a,b) => b.score - a.score)
    }
}

export default connect(mapStateToProps)(Leaderboard)