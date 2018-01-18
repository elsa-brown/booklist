import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import history from './history';
import { Main, TopicDetails, NotFound } from './components';


const Routes = () => {
  return (
    <Router history={history}>
      <Main>
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/topics/:topicId" component={TopicDetails} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </Router>
  );
}

export default Routes;
