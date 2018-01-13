import {
  makeExecutableSchema
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Channel {
  id: ID!                
  name: String
  messages: [Message]!
}

type Message {
	id: ID!
	text: String
}

# Query type specifies entry points into our API
type Query {
  channels: [Channel]
  channel(id: ID!): Channel   
}

input MessageInput {
  channelId: ID!
  text: String
}

# Mutation root type, used to define all mutations
type Mutation {
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
