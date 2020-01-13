import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { SignIn } from './page/SignIn/SignIn';
import { SignUp } from './page/SignUp/SignUp';
import { TodoPage } from './page/Todo/TodoPage';
import { ProfilePage } from './page/Profile/ProfilePage';
import { history } from './history';

import './App.css';

export class App extends Component<any> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={() => <Redirect to="/home" />} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={TodoPage} />
          <Route path="/profile" component={ProfilePage} />
        </div>
      </Router>
    );
  }
}
