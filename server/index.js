import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './graphql/schema';
// import { Engine } from 'apollo-engine';
// import graphql from 'graphql';
// import cors from 'cors';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.port || 3000;

const app = express();
module.exports = app;

// Apollo Engine setup
// const engine = new Engine({
//   engineConfig: {
//     apiKey: process.env.ENGINE_API_KEY,
//     stores: [
//       {
//         name: 'inMemEmbeddedCache',
//         inMemory: {
//           cacheSize: 20971520, // 20 MB
//         },
//       },
//     ],
//     queryCache: {
//       publicFullQueryStore: 'inMemEmbeddedCache',
//     },
//   },
//   graphqlPort: PORT,
// });
// engine.start();

const createApp = () => {

	// logging middleware
	// if (process.env.NODE_ENV !== 'test') {
	// 	app.use(morgan('dev'));
	// }

	// body parsing middleware
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// static file-serving middleware
	app.use(express.static(path.join(__dirname, '..', 'public')));

  // GraphQL setup
  app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ 
		schema,
		tracing: true,
		cacheControl: true,
  })));

	app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

}

const syncDb = () => db.sync()

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}

// server.use('*', cors({ origin: 'http://localhost:3000' }));

