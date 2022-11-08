import React from 'react'
import { safeCredentials, handleErrors } from '../utils/fetchHelper';


class Tweet extends React.Component {
  get id() {  return this.props.id; }
  get message() { return this.props.message; }
  get username() { return this.props.username; }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      tweets: [],
      filter: false
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleLink = this.handleLink.bind(this);

  }

  //fetch current user
  componentDidMount() {
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

  // bind the deleteTweet function to the current instance of the Tweet component if the current user is the same as the user who created the tweet and the button is clicked
  onClick = () => {
    console.log('delete tweet');
    if (this.state.currentUser === this.username) {
      fetch(`/api/tweets/${this.id}`, safeCredentials({
        method: 'DELETE',
      }))
      .then(handleErrors)
      .then(data => {
        window.location.reload();
      })
    }
  }

  handleLink = () => {
    fetch(`/api/users/${this.username}/tweets`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets,
        filter: true
      });
      console.log(data.tweets);

    })
  }

  render() {
    if (this.state.currentUser === this.username) {
    return (
      <React.Fragment>
        <div key={this.id} id={this.id} className="tweet border border-primary rounded shadow mb-3">
          <div className="tweet-content bg-light">
            <div className="user-field">
              <a onClick={this.handleLink} className="username text-decoration-none ps-2 text-muted fw-bold" href='#'>{this.username} </a>
              <br />
              <a className="screenName text-decoration-none ps-2 text-muted" href="/userFeeds">@{this.username}</a>
            </div>
            <div className="tweet-field">
              <p className="tweet-content ps-2">{this.message}</p>
            </div>
            <div onClick={this.onClick} className='delete-button btn m-2 btn-outline-danger' >Delete</div>
          </div>
        </div>
      </React.Fragment>
    )
    } if (this.state.currentUser !== this.username) {
      return (
      <div key={this.id} id={this.id} className="tweet border border-primary rounded shadow mb-3">
          <div className="tweet-content bg-light">
            <div className="user-field">
              <a onClick={this.handleLink} className="username text-decoration-none ps-2 text-muted fw-bold" href="#">{this.username}</a>
              <br />
              <a className="screenName text-decoration-none ps-2 text-muted" href="/userFeeds">@{this.username}</a>
            </div>
            <div className="tweet-field">
              <p className="tweet-content ps-2">{this.message}</p>
            </div>
            <div onClick={this.onClick} className='delete-button btn m-2 btn-outline-danger d-none' >Delete</div>
          </div>
        </div>
      )
    }
  }
}



export default Tweet
