import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import TopicsListWithData from './components/TopicsListWithData';
import NotFound from './components/NotFound';
import TopicDetails from './components/TopicDetails';

import { ApolloClient, ApolloProvider, createNetworkInterface, toIdValue } from 'react-apollo';


const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

// tags GraphQL objects in the ApolloClient cache
function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      topic: (_, args) => {
        // toIdValue ensures an ID type is returned
        return toIdValue(dataIdFromObject({ __typename: 'Topic', id: args['id'] }))
      }
    }
  },
  dataIdFromObject,
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">Books I Want, Have, and Have Read</Link>
            <Switch>
              <Route exact path="/" component={TopicsListWithData}/>
              <Route path="/topics/:topicId" component={TopicDetails}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
