import React from 'react'
import { Component } from 'react'
import { safeCredentials, handleErrors } from '../utils/fetchHelper';


class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            tweetAmount: 0,
        };

        this.getUsername = this.getUsername.bind(this);
        this.getTweetAmount = this.getTweetAmount.bind(this);
    }

    componentDidMount() {
        this.getUsername();
        }

    getUsername = () => {
        fetch('/api/authenticated', safeCredentials({
            method: 'GET',
        }))
        .then(handleErrors)
        .then(data => {
            this.setState({
                username: data.username
            });
            let name = data.username;
            this.getTweetAmount(name);
        })
    }

    getTweetAmount(username) {
        fetch(`/api/users/${username}/tweets`, safeCredentials({
            method: 'GET',
        }))
        .then(handleErrors)
        .then(data => {
            this.setState({ 
            tweetAmount: data.tweets.length });
        })
        }

    render() {
        const { username, tweetAmount } = this.state;
        return (
            <div className="profileCard border border-primary rounded shadow mb-3">
                <div className="profileCard-content">
                    <div className="user-field">
                        <a className="username text-decoration-none ps-2 text-muted fw-bold" href="#">{username}</a>
                        <br/>
                        <a className="screenName text-decoration-none ps-2 text-muted" href="#">@{username}</a>
                    </div>
                    <div className="user-stats row m-0">
                        <div className="col-sm">
                        <a href="" className='text-decoration-none text-muted'>
                            <span>Tweets<br/></span>
                            <span className="user-stats-tweets">{tweetAmount}</span>
                        </a>
                        </div>
                        <div className="col-sm">
                        <a href="" className='text-decoration-none text-muted'>
                            <span>Following<br/></span>
                            <span className="user-stats-following">0</span>
                        </a>
                        </div>
                        <div className="col-sm">
                        <a href="" className='text-decoration-none text-muted'>
                            <span>Followers<br/></span>
                            <span className="user-stats-followers">0</span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCard