import React from 'react'
import { safeCredentials, safeCredentialsFormData, handleErrors } from '../utils/fetchHelper';


class Tweetbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            username: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUsername = this.getUsername.bind(this);
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
      })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
  
      let formData = new FormData();
      formData.append('tweet[message]', this.state.message)
  
      fetch('/api/tweets', safeCredentialsFormData({
        method: 'POST',
        body: formData,
      }))
        .then(handleErrors)
        .then(data => {
          window.location.reload();
          
        })
        .catch(error => {
          alert(error);
        });
    }

    render() {
      
      return (
          <div className="tweet-box border border-primary rounded shadow mt-2 mb-5">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <textarea className="form-control"  rows="3" name="message" value={this.message} onChange={this.handleChange} placeholder="What's happening?" ></textarea>
              </div>
              <button type="submit" className="btn btn-primary float-end shadow my-2">Tweet</button>
            </form>
          </div>
      )
  }
}

export default Tweetbox