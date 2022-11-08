import React from 'react'
import Tweetbox from './tweetbox'
import { safeCredentials, handleErrors } from '../utils/fetchHelper'


class Feedbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      currentUser: '',
    };

    this.getTweets = this.getTweets.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.onClick = this.onClick.bind(this);
    this.userTweets = this.userTweets.bind(this);
  }

  componentDidMount() {
    this.getTweets();
    this.getCurrentUser();
  }

  getTweets = () => {
    fetch('/api/tweets', safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets,
      });
    })
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

  userTweets = (e) => {
    e.preventDefault();
    const username = e.target.id;
    
    window.location.href = `/users/${username}`;
  }

  render() {
    const { tweets } = this.state;
    var btnClass = this.state.filter ? 'btn btn-primary my-2' : 'd-none';
    var tweetboxClass = this.state.filter ? 'd-none' : 'tweetbox';

    return (
      <React.Fragment>
        <div className="col-9 feed-box border border-primary rounded shadow mb-4">
        <div className={tweetboxClass}><Tweetbox /></div>
          <button onClick={this.getTweets} id="global-feed" className={btnClass} >Global Feed</button>
          {tweets.map(tweet => {
            if (this.state.currentUser === tweet.username) {
              return (
                <React.Fragment>
                  <div key={tweet.id} id={tweet.id}  className="tweet border border-primary rounded shadow mb-3">
                    <div className="tweet-content bg-light">
                      <div className="user-field">
                        <button onClick={this.userTweets} id={tweet.username} className='btn text-decoration-none border-none px-2 py-0 fw-bold'>{tweet.username}</button>
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
                        <button onClick={this.userTweets} id={tweet.username} className='btn text-decoration-none border-none px-2 py-0 fw-bold'>{tweet.username}</button>
                        <br />
                        <a className="screenName text-decoration-none ps-2 text-muted" href="#" >@{tweet.username}</a>
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


export default Feedbox