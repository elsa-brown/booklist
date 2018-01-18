import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Topic {
  id: Int               
  name: String
  items: [Item]
}

type Item {
	id: Int
	name: String
  topic: Topic
}

type Query {
  allTopics: [Topic]
  topic(id: Int): Topic
  allItems(topicId: Int): [Item]
}

input ItemInput {
  topicId: ID!
  name: String
}

type Mutation {
  addTopic(name: String!): Topic
  addItem(item: ItemInput!): Item
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
