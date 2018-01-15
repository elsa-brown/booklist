import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import history from './history';
import { Main, TopicDetails, NotFound } from './components';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

const Routes = () => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
      <Main>
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/topics/:topicId" component={TopicDetails} />
          <Route component={NotFound} />
        </Switch>
      </Main>
        </ApolloProvider>
    </Router>
  );
}

export default Routes;
