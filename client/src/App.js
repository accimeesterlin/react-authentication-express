import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import SignIn from './components/signIn/Signin';
import SignUp from './components/signup/SignUp';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';

const IsComponentAuthenticated = (props) => {
  const path = props.path;
  const Component = props.component;

  const isAuthenticated = window.isAuthenticated || false;

  if (isAuthenticated) {
    return <Route path={path} component = {Component} />
  }

  return <Redirect to = "/" />
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path exact = '/' component={SignUp}/>
        <Route path = '/signin' component={SignIn}/>

        <IsComponentAuthenticated path = "/profile" component={Profile}/>
      </div>
    );
  }
}

export default App;
