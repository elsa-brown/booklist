import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.scss';

const client = new ApolloClient({
	link: new HttpLink({ credentials: 'same-origin'}),
	cache: new InMemoryCache(),
	connectToDevTools: true,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>,
  document.getElementById('app')
);
