import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import SignIn from './components/signIn/Signin';
import SignUp from './components/signup/SignUp';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';


const isAuthenticated = false;

const PrivateRoute = ({ component: Component, path: url }) => (
  <Route path={url}  render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path exact = '/' component={SignUp}/>
        <Route path = '/signin' component={SignIn}/>
        <PrivateRoute path = '/dashboard' component={Dashboard}/>

        <PrivateRoute path = "/profile" component={Profile}/>
      </div>
    );
  }
}

export default App;
