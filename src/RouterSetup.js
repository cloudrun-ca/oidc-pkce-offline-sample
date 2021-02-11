import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginHost from './LoginHost';
import LoginHostCallback from './LoginHostCallback';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={LoginHost} />
            <Route path='/implicit/callback' component={LoginHostCallback} />
        </Switch>
    );
}

function RouterSetup(props) {
    return (
        <Router>
            <Routes />
        </Router>
    );
}

export default RouterSetup;