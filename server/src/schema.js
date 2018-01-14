import {
  makeExecutableSchema
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Topic {
  id: ID!                
  name: String
  items: [Item]!
}

type Item {
	id: ID!
	name: String
  detail: String
  url: String
}

input ItemInput {
  topicId: ID!
  name: String
  detail: String
  url: String
}

# Query type specifies entry points into our API
type Query {
  topics: [Topic]
  topic(id: ID!): Topic
}


# Mutation root type, used to define all mutations
type Mutation {
  addTopic(name: String!): Topic
  addItem(item: ItemInput!): Item
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
