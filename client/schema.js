export const typeDefs = `

type Message {
  id: ID!
  name: String
}

type Query {
  messages: [Message]
}
`;
