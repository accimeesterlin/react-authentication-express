import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    componentDidMount() {
        axios({
            url: '/profile',
            method: 'GET'
        })
            .then((response) => {
                console.log('USER: ', response.data);
            })
            .catch((error) => {
                window.alert('Ooops, there is something');
            });
    }
    render() {
        return (
            <div>
                <h2>I am the Profile Page</h2>
            </div>
        )
    }
}
export default Profile