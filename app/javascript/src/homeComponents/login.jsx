import React, { Component } from 'react'
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class LoginBox extends Component{
  constructor(props) {
    super(props)
    this.State = {
      username: '',
      password: ''
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case 'username':
        this.setState({username: value});
        break;
      case 'password':
        this.setState({password: value});
        break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {username, password} = this.state;

    fetch('/api/sessions', safeCredentials({
        method: 'POST',
        body: JSON.stringify({
        user: {
            username,
            password,
        }
        })
    }))
    .then(handleErrors)
    .then(data => {
        if (data.success) {
            window.location.href = '/feeds';
        }
        else {
            throw new Error('Invalid username or password');
        }
    })
    .catch(error => {
        alert(error);
    });
}

  render() {
    return (
      <div className='card p-2 mb-2 border rounded border-primary shadow'>
        <div className='log-in-title card-title'><h4>Login Here</h4></div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <input type="text" name='username' value={this.username} onChange={this.handleChange} className="form-control username mb-2 border border-primary" placeholder="Username"/>
          </div>
          <div className="form-group col-xs-8">
              <input type="password" name='password' value={this.password} onChange={this.handleChange} className="form-control password my-2 border border-primary" placeholder="Password"/>
          </div>
          <button type='submit' className="btn btn-default btn-primary col-xs-3 float-right">Log in</button>
        </form>
      </div>
    )
  }
}
export default LoginBox