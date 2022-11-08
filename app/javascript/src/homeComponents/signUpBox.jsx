import React from 'react'
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class SignUpBox extends React.Component {
    constructor(props) {
        super(props);
        this.State = {
            email:'',
            username:'',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createSession = this.createSession.bind(this);

    }

    handleChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'email':
                this.setState({email: value});
                break;
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
        const { email, username, password } = this.state;

        fetch('/api/users', safeCredentials({
            method: 'POST',
            body: JSON.stringify({
            user: {
                username,
                password,
                email,
            }
            })
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                console.log('success');
            }
            else {
                this.createSession();
            }
        })
        .catch(error => {
            alert(error);
        });
    }

    createSession = () => {
        const { username, password } = this.state;
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
                throw new Error('Invalid username or password for session');
            }
        })
        .catch(error => {
            alert(error);
        });
    }


    render() {
        return (
        <React.Fragment>
            <div className='card p-2 shadow mt-5 border border-primary'>
                <div className='sign-in-title card-title'><h4>Sign up Here</h4></div>
                <form id='signup-form' onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input onChange={this.handleChange} type="text" name='username' value={this.username} className="form-control username mb-2 border border-primary" placeholder="Username"/>
                </div>
                <div className="form-group col-xs-8">
                    <input onChange={this.handleChange} type="email" name='email' value={this.email} className="form-control password my-2 border border-primary" placeholder="Email"/>
                </div>
                <div className="form-group col-xs-8">
                    <input onChange={this.handleChange} type="password" name='password' value={this.password} className="form-control password my-2 border border-primary" placeholder="Password"/>
                </div>
                <button id="sign-in-btn" className="btn btn-default btn-primary col-xs-3">Sign up</button>
                </form>
            </div>
        </React.Fragment>
        )
    }
}

export default SignUpBox;