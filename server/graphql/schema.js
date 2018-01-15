import { makeExecutableSchema } from 'graphql-tools';
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
  topic: Topic
}

input ItemInput {
  topicId: ID!
  name: String
}

# Query type specifies entry points into our API
type Query {
  topics: [Topic]
  topic(id: ID!): Topic
  items(topicId: Int): [Item]
}


# Mutation root type, used to define all mutations
type Mutation {
  addTopic(name: String!): Topic
  addItem(item: ItemInput!): Item
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
