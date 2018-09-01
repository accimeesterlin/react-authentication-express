import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




export default class SignUp extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        // const host = 'http://express-service-authentication.rvepxemghh.us-east-1.elasticbeanstalk.com';
        // const resource = '/signup';

        axios({
            url: '/signup',
            method: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((response) => {
                const isAuthenticated = response.data.isAuthenticated;
                window.isAuthenticated = isAuthenticated;
                this.props.history.push('/profile');
            })
            .catch((error) => {
               const isAuthenticated = error.response.data.isAuthenticated;
               window.isAuthenticated = isAuthenticated;
            });

    };
    render() {
        console.log('State: ', this.state);
        return (
            <div>
                <h2>Yowww, did you really take my build folder?</h2>

                <form onSubmit={this.onSubmit}>
                    <div className="form">
                        <label htmlFor=""></label>
                        <input type="email" name="email" onChange={this.handleChange} />
                    </div>

                    <div className="form">
                        <label htmlFor=""></label>
                        <input type="password" name="password" onChange={this.handleChange} />
                    </div>

                    <button>Join</button>
                </form>

                <Link to="/signin">Go to the Signin</Link>

            </div>
        )
    }
}
