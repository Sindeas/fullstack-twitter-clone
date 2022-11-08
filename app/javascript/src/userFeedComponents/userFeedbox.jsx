import React from 'react'
import UserProfileCard from './userProfileCard'
import { safeCredentials, handleErrors } from '../utils/fetchHelper'


class UserFeedbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      currentUser: '',
      userProfile: '',
    };

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.onClick = this.onClick.bind(this);
    this.userTweets = this.userTweets.bind(this);
  }
  componentDidMount() {
    const userProfile = window.location.pathname.split('/')[2];
    this.setState({
      userProfile: userProfile
    });

    this.userTweets();
    this.getCurrentUser();
  }

  getCurrentUser = () => {  
    fetch('/api/authenticated', safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(data => {
      this.setState({
        currentUser: data.username
      });
    })
  }

  onClick = (e) => {
    let tweet = e.target.closest('.tweet');
    const tweetId = tweet.id;
  
      fetch(`/api/tweets/${tweetId}`, safeCredentials({
        method: 'DELETE',
      }))
      .then(handleErrors)
      .then(data => {
        window.location.reload();
      })
    }

  userTweets = () => {
    const userProfile = window.location.pathname.split('/')[2];
    fetch(`/api/users/${userProfile}/tweets`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets,
      });
    })
  }

    globalFeed = () => {
        window.location.href = '/feeds';
    }


  render() {
    const { tweets, userProfile } = this.state;

    return (
      <React.Fragment>
        <div className="col-9 feed-box border border-primary rounded shadow mb-4">
          <div className="mt-2">
          <UserProfileCard username={userProfile}/>
          </div>
          <div className='d-flex'>
          <button onClick={this.globalFeed} id="global-feed" className='btn btn-primary mb-3' >Global Feed</button>
          </div>
          {tweets.map(tweet => {
            if (this.state.currentUser === tweet.username) {
              return (
                <React.Fragment>
                  <div key={tweet.id} id={tweet.id}  className="tweet border border-primary rounded shadow mb-3">
                    <div className="tweet-content bg-light">
                      <div className="user-field">
                        <button id={tweet.username} className='btn text-decoration-none border-none px-2 py-0 fw-bold'>{tweet.username}</button>
                        <br />
                        <a className="screenName text-decoration-none ps-2 text-muted" href="#">@{tweet.username}</a>
                      </div>
                      <div className="tweet-field">
                        <p className="tweet-content ps-2">{tweet.message}</p>
                      </div>
                      <div onClick={this.onClick} className='delete-button btn m-2 btn-outline-danger' >Delete</div>
                    </div>
                  </div>
                </React.Fragment>
              )
              } if (this.state.currentUser !== tweet.username) {
                return (
                <div key={tweet.id} id={tweet.id} className="tweet border border-primary rounded shadow mb-3">
                    <div className="tweet-content bg-light">
                      <div className="user-field">
                        <button id={tweet.username} className='btn text-decoration-none border-none px-2 py-0 fw-bold'>{tweet.username}</button>
                        <br />
                        <a className="screenName text-decoration-none ps-2 text-muted" href="#">@{tweet.username}</a>
                      </div>
                      <div className="tweet-field">
                        <p className="tweet-content ps-2">{tweet.message}</p>
                      </div>
                      <div className='delete-button btn mb-2 btn-outline-danger d-none' >Delete</div>
                    </div>
                  </div>
                )
              }
          })}
        </div>
      </React.Fragment>
    )
  }
}


export default UserFeedbox;